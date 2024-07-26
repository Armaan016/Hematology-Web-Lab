import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const DLPredict = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  // const [precision, setPrecision] = useState(0.0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filePreview, setFilePreview] = useState('');
  // const [groundTruth, setGroundTruth] = useState(null);
  const [dragStyles, setDragStyles] = useState({
    background: 'none',
    border: '2px dashed #ccc',
  });

  DLPredict.propTypes = {
    onFormSwitch: PropTypes.func.isRequired,
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // const fileNameParts = file.name.split('_');
    // const groundTruth = fileNameParts[0];
    // if (groundTruth == 'LYMPHOCYTE' || groundTruth == 'MONOCYTE') {
    //   setGroundTruth(groundTruth);
    // }

    console.log(selectedFile);
    // console.log(selectedFile.name);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragStyles({
      background: '#A5ADB0',
    });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragStyles({
      background: 'none',
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);

    // const fileNameParts = file.name.split('_');
    // const groundTruth = fileNameParts[0];
    // if (groundTruth == 'LYMPHOCYTE' || groundTruth == 'MONOCYTE') {
    //   setGroundTruth(groundTruth);
    // }

    console.log("File received!");
    // console.log(selectedFile.name);
    setFilePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("Upload an image first!");
      return;
    }
    toast.info('Predicting...Please wait', {
      autoClose: 2000,
    });
    const imageData = new FormData();
    imageData.append('image', selectedFile);
    console.log(imageData);

    try {
      const response = await fetch('http://localhost:5000/dlpredict', {
        method: 'POST',
        body: imageData,
      });

      const data = await response.json();
      // setActualOutput(data.actualOutput);
      setPrediction(data.prediction);
      // setPrecision(data.precision);
      setIsOpen(true);
      setDragStyles({
        background: 'none',
      });
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  const goToHome = () => {
    setTimeout(() => {
      localStorage.setItem('comingFromLogin', 'true');
      props.onFormSwitch('mlpredict');
    });
  }

  const closeModal = () => {
    setIsOpen(false);
    setSelectedFile(null);
    setPrediction('');
    setFilePreview('');
  };


  return (
    <>
      <div className="logout-link">
        <a href="#" onClick={() => props.onFormSwitch('login')}>
          Log Out
        </a>
      </div>
      <div style={{ width: 'fit-content' }}>
        <h1 className='form-header' style={{ justifyContent: 'center' }}>Blood Cell Image Classification</h1>
        <div style={{ width: '500px', display: 'flex', flexDirection: 'column', margin: 'auto', alignItems: 'center', border: '2px solid #d02500', borderRadius: '15px' }}>
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
          <div
            style={{
              width: '300px',
              height: '100px',
              border: '2px dashed #ccc',
              ...dragStyles,
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '20px',
              marginTop: '10px',
              // backgroundColor:'#f9f9f9'
            }}
            onDrop={handleDrop}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <p style={{ margin: '0', fontWeight: 'bold', color: '#d02500' }}>
              {selectedFile ? `Image uploaded! ` : 'Drag & Drop Your Image Here, or'}
            </p>
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
            <button
              className='form-submit-buttons'
              style={{ fontSize: '12px', padding: '5px' }}
              onClick={() => {
                document.querySelector('input[type=file]').click();
              }}
            >
              Browse Image
            </button>
          </div>
          <button className="form-submit-buttons" onClick={handleSubmit} style={{ marginBottom: '4px', margin: '0.2rem', padding: '0.5rem' }}>Predict</button>
          <h4 style={{ color: '#d02500' }}>
            <a href="#" onClick={goToHome} >Click here</a> to go to anemia status prediction
          </h4>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className="modal"
            overlayClassName="overlay"
            ariaHideApp={false}
          >
            <div className="modal-content" style={{width:'300px'}}>
              <h2 style={{ marginTop: 'auto', textDecoration: 'underline', color: '#f9f9f9', fontSize: '30px', textAlign: 'center', paddingBottom: '3px' }}>Prediction Result</h2>
              {selectedFile && (
                <div>
                  {filePreview && <img src={filePreview} alt="Uploaded File Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />}
                  {/* <p style={{ color: '#f9f9f9' }}>Ground Truth: {groundTruth !== null ? groundTruth : 'N.A'}</p> */}
                  <p style={{ color: '#f9f9f9' }}>Predicted class: {prediction}</p>
                  {/* <p style={{ color: '#f9f9f9' }}>Precision Rate: {precision}%</p> */}
                </div>
              )}
              <div className="close-button" style={{ padding: '-2rem' }} onClick={closeModal}>
                Close
              </div>
            </div >
          </Modal >
        </div >
      </div >
    </>
  );
};

export default DLPredict;
