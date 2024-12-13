import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from '@/components/3d-components/logo';

const LogoPart = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div style={{ height: '100vh', width: '100vw', top: 0, left: 0 }}>
      <Canvas
          shadows
          gl={{ alpha: true }} // Disable transparency to force background color
          camera={{ position: [0, 0, 10], fov: 50 }} // Camera settings
          pointerEvents="none"
          touchAction="none"
        >
          {/* Ambient light to softly illuminate the entire scene */}
          <ambientLight intensity={0.6} />

          {/* Directional light to cast soft shadows */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={2.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-bias={-0.001} // Helps with shadow artifacts
          />

          {/* Secondary directional light for additional lighting */}
          <directionalLight position={[-5, 5, 5]} intensity={0.8} />

          {/* A point light behind the object for subtle backlighting */}
          <pointLight
            position={[0, 0, -10]}
            intensity={0.6}
            distance={15} // Spread the light evenly
          />

          {/* 3D Model */}
          <Model scale={0.1} position={[0, 0, 0]} />

          {/* OrbitControls */}
          <OrbitControls
            enableZoom={false} 
            enableRotate={false} // Disables manual rotation
            autoRotate 
            autoRotateSpeed={2} // Sets the speed for auto-rotation
          />
        </Canvas>
      </div>
    </div>
  );
};

export default LogoPart;
