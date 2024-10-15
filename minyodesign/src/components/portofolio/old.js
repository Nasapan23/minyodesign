import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useSwipeable } from 'react-swipeable';
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
    position: [-6, -3.3, -2.5],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.9, 0.9, 0.9],
  },
  {
    position: [6, -3.3, -2.5],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.8, 0.9, 0.9],
  },
  {
    position: [-12, -3, -4],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.85, 0.85, 0.85],
  },
  {
    position: [12, -3, -4],
    rotation: [0, -Math.PI / 2, 0],
    scale: [0.85, 0.85, 0.85],
  },

];

// Function to generate positions dynamically based on `n`
const generatePositionsAndRotations = (n) => {
  const basePositions = positionsAndRotations;
  const cycles = Math.ceil(n / basePositions.length);
  const result = [];

  for (let i = 0; i < cycles; i++) {
    result.push(...basePositions);
  }

  return result.slice(0, n); // Limit to exactly `n` items
};

const Portofoliu = ({ n = 20 }) => {
  const [index, setIndex] = useState(0); // Tracks the center object
  const positionsAndRotationsDynamic = useMemo(() => generatePositionsAndRotations(n), [n]);

  // Gesture handling (swipe)
  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe(1),
    onSwipedRight: () => handleSwipe(-1),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Function to handle swipe direction
  const handleSwipe = (direction) => {
    setIndex((prevIndex) => (prevIndex + direction + n) % n);
  };

  // Generate animated springs for each object
  const animatedSprings = positionsAndRotationsDynamic.map((_, i) => {
    const newIndex = (index + i) % n;
    const { position, rotation, scale } = positionsAndRotationsDynamic[newIndex];
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
        gl={{ alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#ffffff'); // Set the background to white
        }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />

        <pointLight position={[0, -5, -3]} intensity={10} distance={10} decay={2} />
        <mesh position={[0, -5, -3]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color="yellow" />
        </mesh>

        {/* Render animated 3D objects */}
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
 