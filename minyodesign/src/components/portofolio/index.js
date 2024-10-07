import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useSwipeable } from 'react-swipeable'; // Importing react-swipeable
import { DisketaMock } from '@/components/3d-components/diskete-portofoliu/disketa-mock';
import { Sphere, MeshBasicMaterial } from '@react-three/drei';

// Original positions and rotations for the layout
const positionsAndRotations = [
  {
    position: [0, -4, -2],
    rotation: [0, -Math.PI / 2, 0],
    scale: [1, 1, 1],
  },
  {
    position: [-6, -3, -2.5],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.8, 0.8, 0.8],
  },
  {
    position: [6, -3, -2.5],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.8, 0.8, 0.8],
  },
  {
    position: [-12, -3, -4],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.7, 0.7, 0.7],
  },
  {
    position: [12, -3, -4],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.7, 0.7, 0.7],
  },
  {
    position: [-6, -3, -6],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.6, 0.6, 0.6],
  },
  {
    position: [6, -3, -6],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.6, 0.6, 0.6],
  },
];

const Portofoliu = () => {
  const [index, setIndex] = useState(0); // Tracks which object is at the center

  // Gesture handling (swipe)
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // Also tracks mouse drags
  });

  // Function to handle the swipe direction
  const handleSwipe = (direction) => {
    setIndex((prevIndex) => (prevIndex + direction + positionsAndRotations.length) % positionsAndRotations.length);
  };

  // Array to store springs for each object, pushing items from center to sides in sequence
  const animatedSprings = positionsAndRotations.map((_, i) => {
    const newIndex = (index + i) % positionsAndRotations.length;
    const { position, rotation, scale } = positionsAndRotations[newIndex];
    return useSpring({
      position,
      rotation,
      scale,
      config: { tension: 120, friction: 20 },
    });
  });

  return (
    <div {...handlers} style={{ height: '100vh', width: '100vw', touchAction: 'none' }}>
      <Canvas
        shadows
        gl={{ alpha: false }} // Disable transparency to force a solid background color
        onCreated={({ gl }) => {
          gl.setClearColor('#ffffff'); // Set the background to white
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        {/* Added point light at the specific position to lighten the face of the disks */}
        <pointLight
          position={[0, -5, -3]}
          intensity={10} // Adjust this value to control brightness
          distance={10}  // The range of the light
          decay={2}      // The rate at which the light diminishes
        />

        {/* Visual representation of the point light */}
        <mesh position={[0, -5, -3]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="yellow" />
        </mesh>

        {/* Animated positioning of the 3D objects */}
        {animatedSprings.map((animatedProps, i) => (
          <animated.group
            key={i}
            position={animatedProps.position}
            rotation={animatedProps.rotation}
            scale={animatedProps.scale}
          >
            <DisketaMock />
          </animated.group>
        ))}
      </Canvas>
    </div>
  );
};

export default Portofoliu;