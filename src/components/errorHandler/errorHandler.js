import React from 'react';

import './errorHandler.css'
// import errorImg from './errorImg.png';
import errorImg from './errorImg.jpg';

const ErrorHandler = () => {
    return (
        <>
            <span>Something went wrong</span>
            <img src={errorImg} alt="error" />
        </>
    )
}

export default ErrorHandler;