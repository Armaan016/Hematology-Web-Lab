import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Register from './Register';
import EmailRegistration from './EmailRegistration'
import MobileRegistration from './MobileRegistration'
import HomePage from './Home';
import UsernameContext from './UsernameContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [username, setUsername] = useState('');

  const goToLogin = () => {
    setCurrentPage('login');
  }

  const goToRegister = () => {
    setCurrentPage('register');
  }

  // const goToEmail = () => {
  //   setCurrentPage('email'); 
  // }
  // const goToPhone = () => {
  //   setCurrentPage('phone'); 
  // }

  // const goToHomepage = () => {
  //   setCurrentPage('homepage');
  // }

  return (
    <div className="App">
      <UsernameContext.Provider value={{ username, setUsername }}>
        {currentPage === 'home' && (
          <div>
            <h1 style={{ fontSize: '60px' }}>Welcome to Hematology Web Lab</h1>
            {/* <h2 style={{fontSize:'20px'}}>Would you like to login or register?</h2> */}
            <button className='Homepage-button' onClick={goToLogin}>Login</button>
            <button className='Homepage-button' onClick={goToRegister}>Register</button>
            {/* <button className='Homepage-button' onClick={goToEmail}>Email</button> */}
            {/* <button className='Homepage-button' onClick={goToPhone}>Phone Number</button> */}
            {/* <button className='Homepage-button' onClick={goToHomepage}>HomePage</button> */}
          </div>
        )}

        {currentPage === 'login' && <Login onFormSwitch={setCurrentPage} />}
        {currentPage === 'register' && <Register onFormSwitch={setCurrentPage} />}
        {currentPage === 'email' && <EmailRegistration onFormSwitch={setCurrentPage} />}
        {currentPage === 'phone' && <MobileRegistration onFormSwitch={setCurrentPage} />}
        {currentPage === 'homepage' && <HomePage onFormSwitch={setCurrentPage} />}
      </UsernameContext.Provider >
    </div>
  );
}

export default App;
