const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const path = require('path');

const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(express.json());
app.use(cors());

const { spawn } = require('child_process');
const { Number } = require('twilio/lib/twiml/VoiceResponse');


const accountSid = 'ACfc0330ae14d714789b23d0d0fccb907c';
const authToken = 'f24ce938c882a4d3417811b6d2c6bef4';
const twilioPhoneNumber = '+13343669296';
const client = twilio(accountSid, authToken);


const userOtps = new Map();

const sendMessage = async (to, message) => {
    try {
        await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: to,
        });
        console.log(`SMS sent successfully to ${to}`);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
    }
};

const generateRandomOtp = () => {
    return Math.floor(1000 + Math.random() * 9000);
};

app.post('/api/send-sms', async (req, res) => {
    const { phoneNumber } = req.body;
    console.log(phoneNumber);
    const userOtp = generateRandomOtp();
    userOtps.set(phoneNumber, userOtp);
    console.log(userOtp)

    const message = `Your verification code for registering your account on Hematology Web Lab is: ${userOtp}. Thank you for choosing us!`;
    try {
        await sendMessage(phoneNumber, message);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        res.status(500).send(error.message);
    }
});

app.post('/api/verify-otp', (req, res) => {
    const { phoneNumber, userEnteredOtp } = req.body;

    const storedOtp = userOtps.get(phoneNumber);
    console.log('Received OTP verification request:', { phoneNumber, userEnteredOtp });

    if (storedOtp && userEnteredOtp === storedOtp) {
        res.status(200).json({ message: 'OTP verification successful' });
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    num: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
});

const User = mongoose.model('credentials', UserSchema);

mongoose.connect('mongodb://0.0.0.0:27017/Hematology')
    .then(() => {
        console.log('Connected to Hematology database');
    }).catch((err) => {
        console.error('Connection error:', err);
    });

app.post("/register", async (req, res) => {
    try {
        const user = new User(req.body);
        const result = await user.save();
        const userObj = result.toObject();
        console.log(userObj)
        delete userObj.password;
        res.json(userObj);
        console.log('New user registered:', userObj);
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});


app.post("/login", async (req, res) => {
    const userobj = {
        username: req.body.username,
        pass: req.body.password,
    };
    console.log(userobj);
    try {
        const user = await User.findOne(userobj);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.pass !== userobj.pass) {
            return res.status(401).json({ message: "Invalid password" });

        }
        return res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});

const DataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    hemoglobin: {
        type: Number,
        required: true,
    },
    mch: {
        type: Number,
        required: true,
    },
    mcv: {
        type: Number,
        required: true,
    },
    mchc: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    predictions: {
        type: Object,
        required: true,
    }
}, { collection: 'predictions' });

const data = mongoose.model('predictions', DataSchema);

const predict = async (inputData) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['predictions.py', JSON.stringify(inputData)]);

        let prediction = '';
        let error = '';

        pythonProcess.stdout.on('data', (data) => {
            prediction += data;
        });

        pythonProcess.stderr.on('data', (data) => {
            error += data;
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0 || error) {
                reject(`Failed to execute script with error: ${error}`);
            } else {
                try {
                    const parsedPrediction = JSON.parse(prediction);
                    resolve(parsedPrediction);
                } catch (parseError) {
                    reject(`Error parsing prediction result: ${parseError}`);
                }
            }
        });
    });
};

app.post("/data", async (req, res) => {
    try {
        const dataObj = req.body;
        const genderValue = dataObj.gender == 0 ? 'Male' : 'Female';

        const inputData = {
            Gender: dataObj.gender,
            Hemoglobin: dataObj.hemoglobin,
            MCH: dataObj.mch,
            MCHC: dataObj.mchc,
            MCV: dataObj.mcv,
        };
        console.log(inputData)

        const model = dataObj.model;
        if (!model) {
            throw new Error('Model type not provided');
        }

        let prediction1, prediction2;

        let preds = await predict(inputData);

        if (model == 'all') {
            const mappedValues = {
                KNN: preds['KNN'][0] == 0 ? 'Non-Anemic' : 'Anemic',
                OptimizedKNN: preds['KNN'][1] === 0 ? 'Non-Anemic' : 'Anemic',
                GNB: preds['GNB'][0] === 0 ? 'Non-Anemic' : 'Anemic',
                OptimizedGNB: preds['GNB'][1] === 0 ? 'Non-Anemic' : 'Anemic',
                logisticRegression: preds['logisticRegression'][0] === 0 ? 'Non-Anemic' : 'Anemic',
                OptimizedLogisticRegression: preds['logisticRegression'][1] === 0 ? 'Non-Anemic' : 'Anemic',
                decisionTree: preds['decisionTree'][0] === 0 ? 'Non-Anemic' : 'Anemic',
                OptimizedDecisionTree: preds['decisionTree'][1] === 0 ? 'Non-Anemic' : 'Anemic',
                randomForest: preds['randomForest'][0] === 0 ? 'Non-Anemic' : 'Anemic',
                OptimizedRandomForest: preds['randomForest'][1] === 0 ? 'Non-Anemic' : 'Anemic',
                SVM: preds['SVM'][0] === 0 ? 'Non-Anemic' : 'Anemic',
                OptimizedSVM: preds['SVM'][1] === 0 ? 'Non-Anemic' : 'Anemic',
            };

            const newData = new data({
                username: dataObj.username,
                hemoglobin: dataObj.hemoglobin,
                gender: genderValue,
                mch: dataObj.mch,
                mcv: dataObj.mcv,
                mchc: dataObj.mchc,
                predictions: {
                    KNN: mappedValues.KNN,
                    OptimizedKNN: mappedValues.OptimizedKNN,
                    GNB: mappedValues.GNB,
                    OptimizedGNB: mappedValues.OptimizedGNB,
                    logisticRegression: mappedValues.logisticRegression,
                    OptimizedLogisticRegression: mappedValues.OptimizedLogisticRegression,
                    decisionTree: mappedValues.decisionTree,
                    OptimizedDecisionTree: mappedValues.OptimizedDecisionTree,
                    randomForest: mappedValues.randomForest,
                    OptimizedRandomForest: mappedValues.OptimizedRandomForest,
                    SVM: mappedValues.SVM,
                    OptimizedSVM: mappedValues.OptimizedSVM,
                }
            })
            await newData.save();
            console.log("Data saved!");

            console.log(preds);
            res.json(preds);
        }
        else {
            prediction1 = preds[model][0];
            prediction2 = preds[model][1]

            const result1 = prediction1 === 0 ? 'Non-Anemic' : 'Anemic';
            const result2 = prediction2 === 0 ? 'Non-Anemic' : 'Anemic';

            const newData = new data({
                username: dataObj.username,
                hemoglobin: dataObj.hemoglobin,
                mch: dataObj.mch,
                mcv: dataObj.mcv,
                mchc: dataObj.mchc,
                gender: genderValue,
                predictions: { model: model, Unoptimized: result1, Optimized: result2 }
            });
            await newData.save();

            console.log('Prediction:', result1);
            console.log('Optimized Prediction:', result2);
            let preds2 = { model: [prediction1, prediction2] }
            res.json(preds2);
        }

    } catch (error) {
        console.error('Data saving error:', error);
        res.status(500).json({ message: "Something Went Wrong" });
    }
});

const FeedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    }
}, { collection: 'feedback' });

const FeedbackModel = new mongoose.model('Feedback', FeedbackSchema);

app.post("/feedback", async (req, res) => {
    try {
        const userFeedback = new FeedbackModel(req.body);
        const result = await userFeedback.save();

        res.status(201).json({ message: 'Feedback saved successfully', data: result });
        console.log("Feedback data saved successfully!");
    }
    catch (error) {
        console.error("Error saving feedback data: ", error);
    }
});

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/dlpredict', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const imagePath = req.file.path;
        // console.log("File Loaded!");
        console.log(imagePath);

        const pythonProcess = spawn('python', ['./DL.py', imagePath]);
        console.log("Python file running!")
        let prediction = '';

        pythonProcess.stdout.on('data', (data) => {
            const result = JSON.parse(data.toString());
            prediction = result[0];
            precision = result[1];
            console.log("Prediction Result:", prediction);
            console.log("Precision Rate:", precision)
        });

        pythonProcess.on('close', (code) => {
            res.status(200).json({ prediction, precision });
        });
    } catch (error) {
        console.error('Image prediction error:', error);
        res.status(500).json({ message: 'Something went wrong!' });
    }
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

app.get('/testData', (req, res) => {
    console.log('Request received for /testData endpoint');
    const shuffledData = [];
    fs.createReadStream('../anemia data from Kaggle.csv')
        .pipe(csv())
        .on('data', (row) => {
            shuffledData.push(row);
        })
        .on('end', () => {
            const randomizedData = shuffleArray(shuffledData);
            const selectedData = randomizedData.slice(0, 5);
            console.log(selectedData);
            res.json(selectedData);
        });
});


// app.get("/", (req, res) => {
//     res.send("App is Working");
// });

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});  

const __dirname = path.dirname("");
const buildPath = path.join(__dirname , "../build");

app.use(express.static(buildPath));

app.get("/", function(req,res){
    res.sendFile(
        path.join(__dirname, "../build/index.html"),
        function(err) {
            if(err) {
                res.status(500).send(err);
            }
        }
    );
})