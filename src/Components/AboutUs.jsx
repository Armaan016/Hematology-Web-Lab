import React from 'react';
import PropTypes from 'prop-types';

function AboutUs({onFormSwitch}) {
  AboutUs.propTypes = {
    onFormSwitch: PropTypes.func.isRequired,
  };
  
  return (
    <div className='about-container'>
      <h1 className='aboutUs'>About Us</h1>
      <p style={{ color: 'red' }}>Done by: <strong style={{ color: 'orange' }}>Mohammed Armaan Uddin, 22BD1A6611, CSM - A, 2nd Year-1st Sem  </strong></p>
      <h2 className='about-header'>Welcome to Hematology Web Lab</h2>
      <p>
        This is an innovative platform for users to assess and predict their anemia status conveniently. This MERN-based website empowers users to make predictions based on essential health parameters.
      </p>
      <h2>Key Features:</h2>
      <div>
        <p>Predict Anemia: Users can input values such as hemoglobin, mch, mchc, mcv, and gender to predict their anemic status using machine learning models.</p>
        <p>Machine Learning Models: Our platform utilizes various machine learning algorithms including KNN, GNB, decision tree, random forest, SVM, logistic regression, etc., to provide accurate predictions.</p>
        <p>Blood Cell Image Analysis: Users can upload images of blood cells, and our system can predict whether the image contains lymphocytes or monocytes, contributing to a comprehensive health assessment.</p>
      </div>
      <h3>Our Mission</h3>
      <p>
        Our mission is to make health assessment accessible and user-friendly. We believe that everyone should have the tools to monitor and understand their health status effectively. By combining advanced technology with medical insights, we strive to empower individuals to take proactive steps towards a healthier lifestyle.
      </p>
      <p>
        Thank you for choosing Hematology Web Lab. We are committed to continuous improvement and providing a seamless user experience. If you have any questions or feedback, feel free to reach out to us.
      </p>
      <button className='form-submit-buttons' onClick={onFormSwitch}>Return</button>
    </div>
  );
}

export default AboutUs;
