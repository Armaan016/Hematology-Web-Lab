import React from 'react';
import PropTypes from 'prop-types';

function ContactUs({onFormSwitch}) {
  ContactUs.propTypes = {
    onFormSwitch: PropTypes.func.isRequired,
  };

  const contactInfoStyle = {
    marginBottom: '20px',
  };

  const headingStyle = {
    color: 'red',
    fontSize:'30px'
  };

  const contentStyle = {
    color: 'orange',
    fontSize:'25px'
  };

  return (
    <div className="about-container">
      <h1 className='aboutUs'>Contact Us</h1>
      <h2 style={headingStyle}>Phone Number</h2>
      <p style={contentStyle}>For assistance, you can reach us at: <strong>+91 9581495753</strong></p>

      <div style={contactInfoStyle}>
        <h2 style={headingStyle}>Email</h2>
        <p style={contentStyle}>Feel free to email us at: <strong>armaanuddin0016@gmail.com</strong></p>
      </div>

      <div style={contactInfoStyle}>
        <h2 style={headingStyle}>Address</h2>
        <p style={contentStyle}>Visit us at: <strong>Keshav Memorial Institute of Technology, Door No 3-5-1026, Main Road, Near Deepak Theatre, 500029, Narayanguda, Hyderabad, India</strong></p>
      </div>
      <button className='form-submit-buttons' onClick={onFormSwitch}>Return</button>
    </div>
  );
}

export default ContactUs;
