/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UsernameContext from './UsernameContext';

const Login = (props) => {
    const [pass, setPass] = useState('');
    const usernameContext = useContext(UsernameContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!usernameContext.username || !pass) {
            toast.error("You cannot leave any field empty!");
            return;
        }

        try {
            let result = await fetch('http://localhost:5000/login', {
                method: "POST",
                body: JSON.stringify({ username: usernameContext.username, password: pass }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            result = await result.json();
            console.warn(result);

            if (result.message === "Login successful") {
                toast.success("Login successful");
                usernameContext.username = "";
                setPass("");

                setTimeout(() => {
                    localStorage.setItem('comingFromLogin', 'true');
                    props.onFormSwitch('homepage');
                }, 3500);
            } else {
                toast.error('Login Failed! Please check your credentials.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="auth-form-container">
            <ToastContainer position="top-center"
                autoClose={2000}
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
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input value={usernameContext.username} onChange={(e) => usernameContext.setUsername(e.target.value)} type="username" placeholder="Enter your username here" id="username" name="username" />

                <label htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="Enter your password here" id="password" name="password" />
                <div>
                    <button style={{ marginBottom: '0.25rem' }} className="form-submit-buttons" type="submit">Log In</button>
                </div>
            </form>
            <h6>
                Don&apos;t have an account? <a href="#" onClick={() => props.onFormSwitch('register')}>Register here</a>
            </h6>
        </div>
    );
};

export default Login;
