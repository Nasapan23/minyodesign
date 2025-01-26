'use client';

import React from 'react';
import './loading.css';

const LoadingScreen = () => {
  return (
    <div className="loading-screen bg-blue-100">
      <div className="loader"></div>
      <div className="loading-text">Loading Experience</div>
    </div>
  );
};

export default LoadingScreen;
