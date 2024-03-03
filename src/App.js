import React, { useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Register from './Components/Register';
import DLPredict from './Components/DLPredict';
import MLPredict from './Components/MLPredict';
import AboutUs from './Components/AboutUs';
import ContactUs from './Components/ContactUs';
import Feedback from './Components/Feedback';
import MLorDL from './Components/MLorDL';
import UsernameContext from './UsernameContext';

function App() {
  const [currentPage, setCurrentPage] = useState('welcomePage');
  const [username, setUsername] = useState('');

  const goToLogin = () => {
    setCurrentPage('login');
  }

  const goToRegister = () => {
    setCurrentPage('register');
  }
  const goToAbout = () => {
    setCurrentPage('about');
  }
  const goToContact = () => {
    setCurrentPage('contact');
  }
  const goToFeedback = () => {
    setCurrentPage('feedback');
  }

  const goToWelcomePage = () => {
    setCurrentPage('welcomePage');
  }

  return (
    <div className="App">
      <UsernameContext.Provider value={{ username, setUsername }}>
        {currentPage === 'welcomePage' && (
          <div>
            <div className={'welcome-message whoosh-animation'}>
              Welcome to Hematology Web Lab
            </div>
            <div>
              <button className='Homepage-button whoosh-animation1' style={{ marginBottom: '10px' }} onClick={goToLogin}>Login</button>
              <br />
              <button className='Homepage-button whoosh-animation1' style={{ marginTop: '40px', marginBottom: '100px' }} onClick={goToRegister}>Register</button>
            </div>
            <div className="flash-message whoosh-animation4">
              Dive into the Hematology Web Lab experience! Login if you&apos;re already part of our community or Register to unlock new insights and features.</div>
            <div className="whoosh-animation3">
              <a className='bottom-buttons' style={{ left: '10%' }} onClick={goToAbout}>About Us</a>
              <a className='bottom-buttons' style={{ left: '46%' }} onClick={goToContact}>Contact Us</a>
              <a className='bottom-buttons' style={{ left: '84%' }} onClick={goToFeedback}>Feedback</a>
            </div>
          </div>
        )}

        {currentPage === 'login' && <Login onFormSwitch={setCurrentPage} />}
        {currentPage === 'register' && <Register onFormSwitch={setCurrentPage} />}
        {currentPage === 'mlpredict' && <MLPredict onFormSwitch={setCurrentPage} />}
        {currentPage === 'dlpredict' && <DLPredict onFormSwitch={setCurrentPage} />}
        {currentPage === 'about' && <AboutUs onFormSwitch={goToWelcomePage} />}
        {currentPage === 'contact' && <ContactUs onFormSwitch={goToWelcomePage} />}
        {currentPage === 'feedback' && <Feedback onFormSwitch={goToWelcomePage} />}
        {currentPage === 'MLorDL' && <MLorDL onFormSwitch={setCurrentPage} />}
      </UsernameContext.Provider >
    </div>
  );
}

export default App;