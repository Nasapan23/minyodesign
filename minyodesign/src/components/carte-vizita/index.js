'use client';
import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CarteVizitaModel } from '@/components/3d-components/carte-de-vizita';

const RotatingModel = () => {
  const groupRef = useRef();
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotation logic
  useFrame(() => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += 0.000; // Adjust the speed of auto-rotation
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Ensure the model's pivot point is at the center */}
      <CarteVizitaModel scale={0.07} position={[-3, -2, 2]} />
    </group>
  );
};

const CarteDeVizitaPart = () => {
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const handleStartInteraction = () => {
    setIsUserInteracting(true); // Stop auto-rotation during interaction
  };

  const handleEndInteraction = () => {
    setTimeout(() => {
      setIsUserInteracting(false); // Resume auto-rotation after a delay
    }, 2000); // Adjust delay time as needed
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div style={{ height: '100vh', width: '100vw', top: 0, left: 0 }}>
        <Canvas
          shadows
          gl={{ alpha: true }} // Enable transparency
          camera={{ position: [0, 0, 10], fov: 50 }} // Camera settings
        >
          {/* Ambient light to softly illuminate the entire scene */}
          <ambientLight intensity={1} />

          {/* Directional light to cast soft shadows */}
          <directionalLight
            position={[-5, -5, -5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={256}
            shadow-mapSize-height={256}
            shadow-bias={-0.001}
          />

          {/* Secondary directional light for additional lighting */}
          <directionalLight position={[-5, 5, 5]} intensity={0.8} />

          {/* A point light behind the object for subtle backlighting */}
          <pointLight position={[0, 0, -10]} intensity={0.6} distance={15} />

          {/* Rotating 3D Model */}
          <RotatingModel autoRotate={!isUserInteracting} />

          {/* OrbitControls */}
          <OrbitControls
            enableZoom={false}
            onStart={handleStartInteraction}
            onEnd={handleEndInteraction}
          />
        </Canvas>
      </div>
    </div>
  );
};

export default CarteDeVizitaPart;
