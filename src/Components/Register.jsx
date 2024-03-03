/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import React, { useRef, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import Modal from 'react-modal';
import emailjs from '@emailjs/browser';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [num, setNum] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [userEnteredOtp, setUserEnteredOtp] = useState('');
    // const [otpVerification, setOtpVerification] = useState(null);
    const [registrationMethod, setRegistrationMethod] = useState(null);
    const rec_email = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!registrationMethod || !name || !email || !username || !pass || !num) {
            toast.error("You cannot leave any field empty!");
            return;
        }

        try {
            if (registrationMethod === 'email') {
                sendEmailOTP();
            } else if (registrationMethod === 'mobile') {
                sendMobileOTP();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error("Registration failed. Please try again.");
        }
    };

    const handleRadioChange = (e) => {
        setRegistrationMethod(e.target.checked ? e.target.value : null);
    };

    const closeModal = () => {
        setIsOpen(false);
        setRegistrationMethod(null);
    };

    const generateRandomOtp = () => {
        return Math.floor(1000 + Math.random() * 9000);
    };

    const sendEmailOTP = async () => {
        try {
            if (!email) {
                toast.error("You cannot leave the email field empty!");
                return;
            }

            const otp = generateRandomOtp();
            setGeneratedOtp(otp);

            const result = await emailjs.send('service_vch1h4d', 'template_e07zw6f', { to_email: rec_email.current.value, otp }, '1q-KhArbKwicHV8HG');

            console.log(result.text);
            console.log("Email OTP sent successfully!");
            toast.success('OTP sent successfully!');
            setIsOpen(true);
        } catch (error) {
            console.log(error.text);
            toast.error('Failed to send email OTP. Please try again.');
        }
    };

    const sendMobileOTP = async () => {
        try {
            if (!num) {
                toast.error("You can not leave phone number field empty!")
                return;
            }

            const response = await fetch('http://localhost:5000/api/send-sms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: `+${num}` }),
            });

            if (response.ok) {
                toast.success("OTP sent successfully")
                console.log('OTP sent successfully!');
                setIsOpen(true);
            } else {
                console.error('Failed to send OTP:', response.statusText);
                toast.error('Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error.message);
            toast.error('An error occurred while sending OTP. Please try again.');
        }
    };

    const verifyEmailOTP = async (e) => {
        e.preventDefault();
        try {
            console.log('Entered OTP:', userEnteredOtp);
            console.log('Generated OTP:', generatedOtp);

            if (userEnteredOtp === generatedOtp.toString()) {
                toast.success('Your account has been registered successfully!');
                console.log('OTP is correct. Registering...');
                closeModal();
                // setOtpVerification(true);
                storeDataInDatabase();
                setTimeout(() => {
                    props.onFormSwitch('login');
                }, 3000);
                return true;
            } else {
                console.log('Invalid OTP. Please try again.');
                toast.error('Invalid OTP. Please try again.');
                return false;
            }
        } catch (error) {
            console.error('Error verifying email OTP:', error.message);
            toast.error('An error occurred while verifying email OTP. Please try again.');
            return false;
        }
    };

    const verifyMobileOTP = async (e) => {
        e.preventDefault();
        try {
            console.log('Handle OTP is called!')

            const userOtp = parseInt(userEnteredOtp, 10);

            if (isNaN(userOtp) || userOtp <= 0) {
                toast.error("Invalid OTP! Please enter a valid numeric OTP.");
                return false;
            }

            const response = await fetch('http://localhost:5000/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber: `+${num}`, userEnteredOtp: userOtp }),
            });

            if (response.ok) {
                toast.success('Your account has been registered successfully!');
                console.log("Account registered successfully!");
                closeModal();
                storeDataInDatabase();
                setTimeout(() => {
                    props.onFormSwitch('login');
                }, 3000);
                return true;
            } else {
                console.error('Failed to verify mobile OTP:', response.statusText);
                toast.error('Incorrect OTP! Please try again.');
                return false;
            }
        } catch (error) {
            console.error('Error verifying mobile OTP:', error.message);
            toast.error('An error occurred while verifying mobile OTP. Please try again.');
            return false;
        }
    };

    const storeDataInDatabase = async () => {
        try {
            console.log("Storing data in database...");
            let result = await fetch('http://localhost:5000/register', {
                method: "post",
                body: JSON.stringify({
                    name,
                    email,
                    num,
                    username,
                    pass
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!result.ok) {
                throw new Error('Registration failed');
            }

            result = await result.json();
            console.warn(result); 

            document.getElementById("register-form").reset();

            // toast.success("Registration successful!");
            setName("");
            setNum("");
            setEmail("");
            setPass("");
            setUsername("");

            setRegistrationMethod(null);
        } catch (error) {
            console.error('Error storing data in the database:', error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <>
            <div className="logout-link">
                <a href="#" onClick={() => props.onFormSwitch('welcomePage')}>
                    Home Page
                </a>
            </div>
            <div className="auth-form-container">
                <ToastContainer position="top-center"
                    autoClose={3000}
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
                <h1 className="form-header">Register</h1>
                <form className="register-form" onSubmit={handleSubmit} id="register-form">
                    <label htmlFor="name">Name</label>
                    <input style={{ border: '1px solid #d02500' }} value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name here" id="name" name="name" />

                    <label htmlFor="email">Email</label>
                    <input style={{ border: '1px solid #d02500' }} value={email} ref={rec_email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email here" id="email" name="email" />

                    <label htmlFor="num">Phone Number</label>
                    <PhoneInput
                        className='phone-input'
                        country={'in'}
                        value={num}
                        onChange={setNum}
                        maxLength={10}
                        placeholder='Enter your phone number here'
                    />

                    <label htmlFor="username">Username</label>
                    <input style={{ border: '1px solid #d02500' }} value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username here" id="username" name="username" />

                    <label htmlFor="password">Password</label>
                    <input style={{ border: '1px solid #d02500' }} value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password here" id="pass" name="pass" />

                    <div>
                        <label htmlFor="registrationMethod">Registration Method:</label>
                        <div>
                            <label style={{ color: 'gray' }} className="registration-option">
                                <input
                                    type="radio"
                                    value="email"
                                    name="registrationOption"
                                    checked={registrationMethod === 'email'}
                                    onChange={handleRadioChange}
                                />
                                Email
                            </label>
                            <label style={{ color: 'gray' }} className="registration-option">
                                <input
                                    type="radio"
                                    value="mobile"
                                    name="registrationOption"
                                    checked={registrationMethod === 'mobile'}
                                    onChange={handleRadioChange}
                                />
                                Phone Number
                            </label>
                        </div>
                    </div>

                    <h4 style={{ color: '#d02500' }}>An OTP will be sent to your selected registration method to validate your account</h4>
                    <div>
                        <button className="form-submit-buttons" type="submit">Register</button>
                    </div>
                </form>
                <h6 style={{ color: '#d02500' }}>
                    Already have an account? <a href="#" onClick={() => props.onFormSwitch('login')}>Login here</a>
                </h6>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal"
                    overlayClassName="overlay"
                    ariaHideApp={false}
                >
                    <div className="modal-content">
                        {registrationMethod === 'email' ? (
                            <form className="auth-form-container" onSubmit={verifyEmailOTP} style={{padding:'0px 30px',width:'380px'}}>
                                <h3 style={{ color: '#f9f9f9', textAlign: 'center' }}>An OTP has been sent to your email address:<br/> {email}</h3>
                                <input
                                    type="number"
                                    placeholder="Enter your OTP here"
                                    name="otp"
                                    value={userEnteredOtp}
                                    onChange={(e) => setUserEnteredOtp(e.target.value)}
                                    maxLength={4}
                                />
                                <div>
                                    <button className="form-submit-buttons" style={{marginLeft:'150px',border:'2px solid white',color:'red',backgroundColor:'white'}} type="submit">Submit</button>
                                </div>
                            </form>
                        ) : (
                            <form className="auth-form-container" style={{padding:'0px 30px'}}>
                                <h3 style={{ color: '#f9f9f9', textAlign: 'center' }}>An OTP has been sent to your <br /> phone number: +{num}</h3>
                                <input
                                    type="number"
                                    placeholder="Enter your OTP here"
                                    name="otp"
                                    value={userEnteredOtp}
                                    onChange={(e) => setUserEnteredOtp(e.target.value)}
                                    maxLength={6}
                                />
                                <div>
                                    <button onClick={verifyMobileOTP} style={{marginLeft:'120px',border:'2px solid white',color:'red',backgroundColor:'white'}} className="form-submit-buttons" type="submit">Submit</button>
                                </div>
                            </form>
                        )}
                        <div className="close-button" onClick={closeModal}>
                            Cancel
                        </div>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default Register;