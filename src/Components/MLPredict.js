/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import UsernameContext from '../UsernameContext';

const MLPredict = (props) => {
    const [gender, setGender] = useState(null);
    const [gender2, setGender2] = useState(null);
    const [hemoglobin, setHemoglobin] = useState('');
    const [mch, setMch] = useState('');
    const [mcv, setMcv] = useState('');
    const [mchc, setMchc] = useState('');
    const [predictionResult, setPredictionResult] = useState('');
    const [predictionResult2, setPredictionResult2] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [model, setModel] = useState('')
    const [optimizedPredictionResults, setOptimizedPredictionResults] = useState({});
    const [dropdown, setDropdown] = useState(false);
    const [testData, setTestData] = useState([]);
    const [result, setResult] = useState('');

    const { username } = useContext(UsernameContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!gender || !hemoglobin || !mch || !mcv || !mchc || !model) {
            toast.error("You cannot leave any field empty!",);
            return;
        }
        toast.info('Predicting...Please wait', {
            autoClose: 1400,
        });
        console.log(gender, hemoglobin, username, mch, mcv, mchc, model);

        try {
            const result = await fetch('http://localhost:5000/data', {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    hemoglobin: Number(hemoglobin),
                    gender: Number(gender),
                    mchc: Number(mchc),
                    mch: Number(mch),
                    mcv: Number(mcv),
                    model: model
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!result.ok) {
                throw new Error('Prediction failed');
            }

            const preds = await result.json();

            console.log(preds)


            if (model == 'all') {
                setOptimizedPredictionResults(preds);
                setIsOpen(true);
                return;
            } else {
                setPredictionResult(preds["model"][0] === 0 ? 'Non-Anemic' : 'Anemic');
                setPredictionResult2(preds["model"][1] === 0 ? 'Non-Anemic' : 'Anemic');

                setIsOpen(true);
            }

            setModel('');
            setGender(null);
            setHemoglobin('');
            setMch('');
            setMcv('');
            setMchc('');
        } catch (error) {
            console.error('Error:', error);
            toast.error("Prediction failed. Please try again.");
        }
    }

    const closeModal = () => {
        setIsOpen(false);
        setPredictionResult('');
        setPredictionResult2('');
        setOptimizedPredictionResults({});
    };

    const handleTestData = async () => {
        try {
            const response = await fetch('http://localhost:5000/testData');
            if (!response.ok) {
                throw new Error('Failed to fetch test data');
            }
            const testData = await response.json();
            setTestData(testData);
        } catch (error) {
            console.error('Error fetching test data:', error);
        }
    };

    useEffect(() => {
        const isComingFromLogin = localStorage.getItem('comingFromLogin');
        if (isComingFromLogin) {
            handleTestData();
            localStorage.removeItem('comingFromLogin');
        }
    }, []);

    const handleTestDataSelection = (e) => {
        setDropdown(true);
        let selectedIndex = e.target.selectedIndex;
        selectedIndex = selectedIndex - 1;
        let gen = testData[selectedIndex]['Gender'] == 0 ? 'Male' : 'Female';
        setGender(testData[selectedIndex]['Gender']);
        setGender2(gen);
        setHemoglobin(testData[selectedIndex]['Hemoglobin']);
        setMch(testData[selectedIndex]['MCH']);
        setMcv(testData[selectedIndex]['MCV']);
        setMchc(testData[selectedIndex]['MCHC']);
        let res = testData[selectedIndex]['Result'] == 0 ? 'Non-Anemic' : 'Anemic';
        setResult(res);
    };

    return (
        <>
            <div className="logout-link">
                <a href="#" onClick={() => props.onFormSwitch('login')}>
                    Log Out
                </a>
            </div>
            <div className="auth-form-container">
                <ToastContainer position="top-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='light'
                    toastStyle={{ fontSize: '16px' }}
                    bodyClassName="custom-toast-body"
                    progressBarStyle={{ background: 'white' }} />
                <h3 className="form-header" style={{fontSize:'50px' }}>Anemia Checkup Tool</h3>
                <form className="homepage-form" onSubmit={handleSubmit} id="homepage-form" style={{ marginRight: '-2px' }}>
                    <div>
                        <label htmlFor="gender">Gender: </label>
                        <select style={{ marginRight: '10px' }} value={gender} onChange={(e) => setGender(e.target.value)} id="gender" name="gender">
                            <option value="">Select gender</option>
                            <option value="0">Male</option>
                            <option value="1">Female</option>
                        </select>
                        <label htmlFor="model">Model: </label>
                        <select value={model} onChange={(e) => setModel(e.target.value)} id="model" name="model">
                            <option value="">Select model</option>
                            <option value="KNN">KNN</option>
                            <option value="GNB">GaussianNB</option>
                            <option value="logisticRegression">Logistic Regression</option>
                            <option value="decisionTree">Decision Tree</option>
                            <option value="randomForest">Random Forest</option>
                            <option value="SVM">SVM</option>
                            <option value="all">All models</option>
                        </select>
                        <div style={{margin:'15px'}}>
                            <label htmlFor="testDataDropdown">Test Data:</label>
                            <select className="testDataDropdown" style={{ width: '500px' }} id="testDataDropdown" onChange={handleTestDataSelection}>
                                <option value="">Select test data</option>
                                {testData.map((row, index) => (
                                    <option key={index}>
                                        {`Ground Truth: ${row.Result == 0 ? 'Non-Anemic' : 'Anemic'}, Hemoglobin: ${row.Hemoglobin}, MCH: ${row.MCH}, MCV: ${row.MCV}, MCHC: ${row.MCHC}, Gender: ${row.Gender == 0 ? 'Male' : 'Female'}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <label htmlFor="hemoglobin">Hemoglobin</label>
                    <input value={hemoglobin} onChange={(e) => setHemoglobin(e.target.value)} type="number" placeholder="Enter hemoglobin value" id="hemoglobin" name="hemoglobin" />

                    <label htmlFor="mch">MCH</label>
                    <input value={mch} onChange={(e) => setMch(e.target.value)} type="number" placeholder="Enter MCH value" id="mch" name="mch" />

                    <label htmlFor="mchc">MCHC</label>
                    <input value={mchc} onChange={(e) => setMchc(e.target.value)} type="number" placeholder="Enter MCHC value" id="mchc" name="mchc" />

                    <label htmlFor="mcv">MCV</label>
                    <input value={mcv} onChange={(e) => setMcv(e.target.value)} type="number" placeholder="Enter MCV value" id="mcv" name="mcv" />


                    <div>
                        <button className="form-submit-buttons" type="submit">Predict</button>
                    </div>
                </form>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    overlayClassName="overlay"
                    ariaHideApp={false}
                >
                    <div className="modal-content">
                        <h2 style={{ margin: 'auto', textDecoration: 'underline', color: '#f9f9f9', textAlign: 'center' }}>Prediction Results</h2>
                        {model == 'all' ? (
                            <>
                                {dropdown && (
                                    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '1px solid #dddddd', color: '#f9f9f9' }}>
                                                <th style={{ padding: '8px', textAlign: 'left' }}>Ground Truth</th>
                                                <th style={{ padding: '8px', textAlign: 'left' }}>Gender</th>
                                                <th style={{ padding: '8px', textAlign: 'left' }}>Hemoglobin</th>
                                                <th style={{ padding: '8px', textAlign: 'left' }}>MCH</th>
                                                <th style={{ padding: '8px', textAlign: 'left' }}>MCHC</th>
                                                <th style={{ padding: '8px', textAlign: 'left' }}>MCV</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{result}</td>
                                                <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{gender2}</td>
                                                <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{hemoglobin}</td>
                                                <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{mch}</td>
                                                <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{mchc}</td>
                                                <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{mcv}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                    <thead>
                                        <tr style={{ borderBottom: '1px solid #dddddd', color: '#f9f9f9' }}>
                                            <th style={{ padding: '8px', textAlign: 'left' }}>Model</th>
                                            <th style={{ padding: '8px', textAlign: 'left' }}>Prediction</th>
                                            <th style={{ padding: '8px', textAlign: 'left' }}>Optimized Prediction</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(optimizedPredictionResults).map((modelName) => {
                                            return (
                                                <tr key={modelName} style={{ borderBottom: '1px solid #dddddd' }}>
                                                    <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{modelName}</td>
                                                    <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{optimizedPredictionResults[modelName][0] === 0 ? 'Non-Anemic' : 'Anemic'}</td>
                                                    <td style={{ padding: '8px', textAlign: 'left', color: '#dddddd' }}>{optimizedPredictionResults[modelName][1] === 0 ? 'Non-Anemic' : 'Anemic'}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <>
                                <p style={{ color: '#f9f9f9' }}>Normal Prediction: {predictionResult}</p>
                                <p style={{ color: '#f9f9f9' }}>Optimized Prediction: {predictionResult2}</p>
                            </>
                        )}

                        <div className="close-button" onClick={closeModal}>
                            Close
                        </div>
                    </div>
                </Modal>
                <h6 style={{color:'#d02500'}}>
                    Predict blood cell class using an image? <a href="#" onClick={() => props.onFormSwitch('dlpredict')}>Click here</a>
                </h6>
            </div >
        </>
    );
};

export default MLPredict;
