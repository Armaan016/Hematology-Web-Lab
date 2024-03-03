// /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

// import React, { useRef, useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const EmailRegistration = (props) => {
//   const emailForm = useRef();
//   const otpForm = useRef();
//   const rec_email = useRef();

//   const [showEmailForm, setShowEmailForm] = useState(true);
//   const [generatedOtp, setGeneratedOtp] = useState(null);
//   const [userEnteredOtp, setUserEnteredOtp] = useState('');
//   const [userEmail, setUserEmail] = useState('');

//   const generateRandomOtp = () => {
//     return Math.floor(1000 + Math.random() * 9000);
//   };

//   const sendOTP = (e) => {
//     e.preventDefault();

//     if (!userEmail) {
//       toast.error("You can not leave email field empty!")
//     }
//     const otp = generateRandomOtp();
//     setGeneratedOtp(otp);

//     emailjs.send('service_vch1h4d', 'template_e07zw6f', { to_email: rec_email.current.value, otp }, '1q-KhArbKwicHV8HG')
//       .then((result) => {
//         console.log(result.text);
//         console.log("message sent");
//         toast.success('OTP sent successfully!');
//         setShowEmailForm(false);
//         otpForm.current.querySelector('input[name="otp"]').focus();
//       })
//       .catch((error) => {
//         console.log(error.text);
//       });
//   };

//   const handleOTPSubmit = (e) => {
//     e.preventDefault();
//     console.log('Entered OTP:', userEnteredOtp);
//     console.log('Generated OTP:', generatedOtp);

//     if (userEnteredOtp === generatedOtp.toString()) {
//       toast.success('Your account has been registered successfully!');
//       console.log('OTP is correct. Registering...');
//       setTimeout(() => {
//         props.onFormSwitch('login');
//       }, 3000);
//     } else {
//       console.log('Invalid OTP. Please try again.');
//       toast.error('Invalid OTP. Please try again.');
//     }
//   };

//   return (
//     <div style={{ width: '500px' }}>
//       <ToastContainer position="top-center"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme='light'
//         toastStyle={{ fontSize: '16px' }}
//         bodyClassName="custom-toast-body"
//         progressBarStyle={{ background: 'white' }} />
//       {showEmailForm && (
//         <form className="auth-form-container" onSubmit={sendOTP} ref={emailForm}>
//           <label style={{ fontFamily: 'Calligraffitti', textDecoration: 'underline', fontSize: '30px' }} htmlFor="email">Email Registration</label>
//           <input
//             type="email"
//             placeholder="Re-enter your email address here"
//             id="email"
//             name="email"
//             value={userEmail}
//             ref={rec_email}
//             onChange={(e) => setUserEmail(e.target.value)}
//           />
//           <div>
//             <button className='form-submit-buttons' onClick={() => props.onFormSwitch('register')}>Cancel</button>
//             &nbsp;
//             <button className="form-submit-buttons" type="submit">Send OTP</button>
//           </div>
//         </form>
//       )}

//       {!showEmailForm && (
//         <form className="auth-form-container" onSubmit={handleOTPSubmit} ref={otpForm}>
//           <label htmlFor="otp">OTP</label>
//           <input
//             type="number"
//             placeholder="Enter your OTP here"
//             name="otp"
//             value={userEnteredOtp}
//             onChange={(e) => setUserEnteredOtp(e.target.value)}
//             maxLength={4}
//           />
//           <div>
//             <button className="form-submit-buttons" type="submit">Submit</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default EmailRegistration;
