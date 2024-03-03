// /* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

// import React, { useRef, useState } from 'react';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const OTPForm = (props) => {
//   const mobileForm = useRef(null);

//   const [showMobileForm, setShowMobileForm] = useState(true);
//   const [userEnteredOtp, setUserEnteredOtp] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const formattedPhoneNumber = `+91${phoneNumber}`;

//   const sendOTP = async () => {
//     if (!phoneNumber) {  
//       toast.error("You can not leave phone number field empty!")
//     }
//     try {
//       const response = await fetch('http://localhost:5000/api/send-sms', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phoneNumber: formattedPhoneNumber }),
//       });

//       if (response.ok) {
//         toast.success("OTP sent successfully")
//         console.log('OTP sent successfully!');
//         setShowMobileForm(false);
//       } else {
//         console.error('Failed to send OTP:', response.statusText);
//         toast.error('Failed to send OTP. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error sending OTP:', error.message);
//       toast.error('An error occurred while sending OTP. Please try again.');
//     }
//   };

//   const handleOTPSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Handle OTP is called!')

//     const userOtp = parseInt(userEnteredOtp, 10); 

//     if (isNaN(userOtp) || userOtp <= 0) {
//       toast.error("Invalid OTP! Please enter a valid numeric OTP.");
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:5000/api/verify-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ phoneNumber: formattedPhoneNumber, userEnteredOtp: userOtp }),
//       });
      
//       if (response.ok) {
//         toast.success('Your account has been registered successfully!');
//         console.log("Account registered successfully!");
//         setTimeout(() => {
//           props.onFormSwitch('login');
//         }, 3000);
//       } else {
//         console.error('Failed to verify OTP:', response.statusText);
//         toast.error('The OTP you entered is wrong! Please try again.');
//       }
//     } catch (error) {
//       console.error('Error verifying OTP:', error.message);
//       toast.error('An error occurred while verifying OTP. Please try again.')
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
//       {showMobileForm && (
//         <div style={{border:'2px solid white',borderRadius:'10px',padding:'2rem'}}>
//           <label style={{fontFamily: 'Calligraffitti',textDecoration:'underline',fontSize:'30px'}} htmlFor="phone">Phone Number Registration</label>
//           <form action="phone" ref={mobileForm}>
//             <PhoneInput
//               country={'in'}
//               value={phoneNumber}
//               onChange={setPhoneNumber}
//               placeholder='Re-enter your phone number here'
//             />
//             <button className='form-submit-buttons' onClick={() => props.onFormSwitch('register')}>Cancel</button>
//             &nbsp;
//             <button
//               className='form-submit-buttons'
//               type='submit'
//               onClick={(e) => {
//                 e.preventDefault();
//                 sendOTP();
//               }}
//             >
//               Send OTP
//             </button>
//           </form>
//         </div>
//       )}

//       {!showMobileForm && (
//         <form className="auth-form-container" >
//           <label htmlFor="otp">OTP</label>
//           <input
//             type="number"
//             placeholder="Enter your OTP here"
//             name="otp"
//             value={userEnteredOtp}
//             onChange={(e) => setUserEnteredOtp(e.target.value)}
//             maxLength={6}
//           />
//           <div>
//             <button onClick={(e) => {
//               e.preventDefault();
//               handleOTPSubmit(e);
//             }} className="form-submit-buttons" type="submit">Submit</button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default OTPForm;
