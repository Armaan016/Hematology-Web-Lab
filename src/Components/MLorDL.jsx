import React from 'react';
import PropTypes from 'prop-types';

function MLorDL(props) {
    MLorDL.propTypes = {
        onFormSwitch: PropTypes.func.isRequired,
    };
    return (
        <div>
            <button className='Homepage-button' onClick={() => { props.onFormSwitch('mlpredict') }}>Predict your anemia status using Machine Learning</button>
            <button className='Homepage-button' onClick={() => { props.onFormSwitch('dlpredict') }}>Predict class of blood cell image using Deep Learning</button>
        </div>
    );
}

export default MLorDL;
