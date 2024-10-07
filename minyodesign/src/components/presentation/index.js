'use client';  // Mark the component as client-side

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber'; // Ensure useFrame is imported here
import { OrbitControls } from '@react-three/drei';
import { DisketaMica } from '@/components/3d-components/disketa-mica/';
import DisketaMare from '../3d-components/disketa-mare';
import useIsMobile from '@/hooks/UseIsMobile'; // Import the custom hook
import * as THREE from 'three';



const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector2();


// Floating and interactive component for disketa
const InteractiveDisketa = ({ children, initialPosition, floatSpeed = 0.5, amplitude = 0.2, phaseOffset = 0 }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [rotation, setRotation] = useState([0, 0, 0]);

  const isMobile = useIsMobile(); // Detect mobile to disable hover effect on mobile

  // The initial rotation (zero) to which the disk will return
  const originalRotation = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse, viewport } = state;
  
    // Normalized mouse coordinates between -1 and 1 (left to right, top to bottom)
    const mouseX = (mouse.x * viewport.width) / 2; // X-axis, viewport dependent
    const mouseY = (mouse.y * viewport.height) / 2; // Y-axis, viewport dependent
  
    // Define the rotation scale based on how much rotation you want (adjust these numbers as needed)
    const rotationScaleX = 0.02; // Adjust this value for X rotation sensitivity
    const rotationScaleY = 0.02; // Adjust this value for Y rotation sensitivity
  
    // Only apply rotation if the object is hovered over
    if (hovered && !isMobile) {
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        mouseY * rotationScaleX,  // Rotate around X based on mouse Y
        0.1
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        mouseX * rotationScaleY,  // Rotate around Y based on mouse X
        0.1
      );
    } else {
      // Smoothly return to original rotation if not hovered
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, originalRotation.x, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, originalRotation.y, 0.1);
    }
  
    // Floating effect
    ref.current.position.y = initialPosition[1] + Math.sin(time * floatSpeed + phaseOffset) * amplitude;
  });
  
  

  return (
    <group
      ref={ref}
      position={initialPosition}
      rotation={rotation}
      onPointerOver={() => !isMobile && setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {children}
    </group>
  );
};

const Prezentare = () => {
  const isMobile = useIsMobile(); // Use the hook to detect if it's mobile

  // Define different positions and scales for mobile and desktop
  const disketaMicaPosition1 = isMobile ? [0, -1.5, 0] : [4, 0, 0];
  const disketaMicaPosition2 = isMobile ? [0, -4, 0] : [4, -4, 0];
  const disketaMarePosition = isMobile ? [3.3, 0, 0] : [3, -5.5, 0];

  const disketaMicaScale = isMobile ? [0.7, 0.7, 0.7] : [1.3, 1.3, 1.3];
  const disketaMareScale = isMobile ? [0.7, 0.7, 0.7] : [1.5, 1.5, 1.5];

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Canvas
        shadows
        gl={{ alpha: false }} // Disable transparency to force background color
        camera={{ position: [0, 0, 10], fov: 50 }} // Camera settings
        onCreated={({ gl }) => {
          gl.setClearColor('white'); // Set the background to white
        }}
      >
        {/* Ambient light to softly illuminate the entire scene */}
        <ambientLight intensity={0.6} />

        {/* Directional light to cast soft shadows */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.001}  // Helps with shadow artifacts
        />

        {/* Secondary directional light for additional lighting */}
        <directionalLight
          position={[-5, 5, 5]}
          intensity={0.8}
        />

        {/* A point light behind the object for subtle backlighting */}
        <pointLight
          position={[0, 0, -10]}
          intensity={0.6}
          distance={15} // Spread the light evenly
        />

        {/* Each disketa is wrapped with InteractiveDisketa to apply floating and interaction behavior */}
        
        {/* First DisketaMica with hover interaction */}
        <InteractiveDisketa initialPosition={disketaMicaPosition1} floatSpeed={0.5} amplitude={0.2} phaseOffset={0}>
          <DisketaMica
            rotation={[0, -Math.PI / 2, 0]}
            scale={disketaMicaScale}
          />
        </InteractiveDisketa>

        {/* Second DisketaMica with hover interaction */}
        <InteractiveDisketa initialPosition={disketaMicaPosition2} floatSpeed={0.6} amplitude={0.25} phaseOffset={1}>
          <DisketaMica
            rotation={[0, -Math.PI / 2, 0]}
            scale={disketaMicaScale}
          />
        </InteractiveDisketa>

        {/* DisketaMare with hover interaction */}
        <InteractiveDisketa initialPosition={disketaMarePosition} floatSpeed={0.4} amplitude={0.3} phaseOffset={2}>
          <DisketaMare
            rotation={[0, -Math.PI / 2, 0]}
            scale={disketaMareScale}
          />
        </InteractiveDisketa>

        {/* Optional OrbitControls for interactivity */}
        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default Prezentare;
