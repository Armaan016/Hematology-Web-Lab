// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcN59XTSQYqB-WL6CsM05F4cLHX1TZwe0",
  authDomain: "otp-configuration.firebaseapp.com",
  projectId: "otp-configuration",
  storageBucket: "otp-configuration.appspot.com",
  messagingSenderId: "378741968289",
  appId: "1:378741968289:web:57ffb25594b5a780360fe0",
  measurementId: "G-ZV6G142ED4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth};
