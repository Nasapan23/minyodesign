'use client';
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Model } from '@/components/3d-components/logo';

const RotatingModel = () => {
  const groupRef = useRef();

  // Rotate the model on each frame
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Adjust for speed
    }
  });

  return (
    <group ref={groupRef}>
      <Model scale={0.1} position={[0, 0, 0]} />
    </group>
  );
};

const LogoPart = () => {
  return (
    <div className="relative flex items-center justify-center h-screen w-full">
      <div
        style={{
          height: '100%',
          width: '100%',
          position: 'relative',
        }}
      >
        <Canvas
          shadows
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 10], fov: 50 }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={2.5}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-bias={-0.001}
          />
          <directionalLight position={[-5, 5, 5]} intensity={0.8} />
          <pointLight position={[0, 0, -10]} intensity={0.6} distance={15} />
          <RotatingModel />
        </Canvas>
      </div>
    </div>
  );
};

export default LogoPart;
