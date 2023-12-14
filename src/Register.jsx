/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [num, setNum] = useState('');
    const [registrationMethod, setRegistrationMethod] = useState(null);
    // const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!registrationMethod || !name || !email || !username || !pass || !num) {
            toast.error("You cannot leave any field empty!");
            return;
        }

        try {
            let result = await fetch('http://localhost:5000/register', {
                method: "post",
                body: JSON.stringify({
                    name,
                    email,
                    num,
                    username,
                    pass,
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

            toast.success("Registration successful!");
            setName("");
            setNum("");
            setEmail("");
            setPass("");
            setUsername("");

            console.log(registrationMethod)

            if (registrationMethod === 'email') {
                props.onFormSwitch('email');
            } else if (registrationMethod === 'mobile') {
                props.onFormSwitch('phone');
            }

            setRegistrationMethod(null);

        } catch (error) {
            console.error('Error:', error);
            toast.error("Registration failed. Please try again.");
        }
    };

    const handleRadioChange = (e) => {
        setRegistrationMethod(e.target.value);
    };

    return (
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
                // style={{ color: '#ffffff'  }} 
                progressBarStyle={{ background: 'white' }} />
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit} id="register-form">
                <label htmlFor="name">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name here" id="name" name="name" />

                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email here" id="email" name="email" />

                <label htmlFor="num">Phone Number</label>
                <input value={num} onChange={(e) => setNum(e.target.value)} type="tel" maxLength={10} placeholder="Enter your phone number here" id="num" name="num" />

                <label htmlFor="username">Username</label>
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your username here" id="username" name="username" />

                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password here" id="pass" name="pass" />

                <div>
                    <label htmlFor="registrationMethod">Registration Method:</label>
                    <div>
                        <label className="registration-option">
                            <input
                                type="radio"
                                value="email"
                                name="registrationOption"
                                checked={registrationMethod === 'email'}
                                onChange={handleRadioChange}
                            />
                            Email
                        </label>
                        <label className="registration-option">
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

                <h4>An OTP will be sent to your selected registration method to validate your account</h4>
                {/* {error && <p className="error-message">{error}</p>} */}
                <div>
                    <button className="form-submit-buttons" type="submit">Register</button>
                </div>
            </form>
            <h6>
                Already have an account? <a href="#" onClick={() => props.onFormSwitch('login')}>Login here</a>
            </h6>
        </div>
    );
};

export default Register;
