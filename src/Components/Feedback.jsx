import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

function Feedback({ onFormSwitch }) {
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState(0);
  const [ratingKey, setRatingKey] = useState(0);

  Feedback.propTypes = {
    onFormSwitch: PropTypes.func.isRequired,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !comments || !rating) {
      toast.error("Please fill all the fields first!");
      return;
    }
    try {
      let result = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        body: JSON.stringify({ email: email, feedback: comments, rating: rating }),
        headers: {
          'Content-type': 'application/json'
        }
      });

      result = await result.json();
      console.warn(result);

      setEmail('');
      setComments('');
      setRating(0);
      setRatingKey((prevKey) => prevKey + 1);
      toast.success("Thank you for your valuable feedback!");
    } catch (error) {
      console.log("Error encountered:", error);
    }
  };

  const formStyle = {
    width: '300px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <>
      <div className="auth-form-container">
        <ToastContainer position="top-center"
          autoClose={2500}
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
        <h1 className='aboutUs'>Feedback</h1>
        <form style={formStyle} onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder='Enter your email address '
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="comments">Feedback:</label>
          <textarea
            id="comments"
            name="comments"
            value={comments}
            placeholder='Enter your feedback here'
            onChange={(e) => setComments(e.target.value)}
            style={{ width: '80%' }}
            required
          />
          <br />

          <label htmlFor="rating">Rating:</label>
          <Rating
            count={5}
            value={rating}
            onChange={(rating) => setRating(rating)}
            size={24}
            activeColor="#ffd700"
            key={ratingKey}
          />

          <button className='form-submit-buttons' type="submit">Submit Feedback</button>
        </form>
      </div>
      <button style={{ position: 'absolute', bottom: '30px' }} className='form-submit-buttons' onClick={onFormSwitch}>Return</button>
    </>
  );
}

export default Feedback;
