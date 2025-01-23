'use client';

import React from 'react';
import { useProgress } from '@react-three/drei';
import './loading.css';

const LoadingScreen = () => {
  const { progress = 0 } = useProgress(); // Default to 0% during SSR

  return (
    <div className="loading-screen bg-blue-100">
      <div className="loader"></div>
      <div style={{ marginTop: '20px', fontSize: '18px', color: 'black' }}>
        {Math.round(progress)}% loaded
      </div>
    </div>
  );
};

export default LoadingScreen;
