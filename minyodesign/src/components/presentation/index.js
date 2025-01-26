'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { DisketaMica1 } from '@/components/3d-components/disketa-mica-1';
import { DisketaMica2 } from '@/components/3d-components/disketa-mica-2';
import DisketaMare from '../3d-components/disketa-mare';
import useIsMobile from '@/hooks/UseIsMobile';
import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector2();

// Floating and interactive component for disketa
const InteractiveDisketa = ({ children, initialPosition, floatSpeed = 0.5, amplitude = 0.2, phaseOffset = 0 }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const isMobile = useIsMobile();

  const originalRotation = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse, viewport } = state;

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    const rotationScaleX = 0.02;
    const rotationScaleY = 0.02;

    if (hovered && !isMobile) {
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        mouseY * rotationScaleX,
        0.1
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        mouseX * rotationScaleY,
        0.1
      );
    } else {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, originalRotation.x, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, originalRotation.y, 0.1);
    }

    ref.current.position.y = initialPosition[1] + Math.sin(time * floatSpeed + phaseOffset) * amplitude;
  });

  return (
    <group
      ref={ref}
      position={initialPosition}
      onPointerOver={() => !isMobile && setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {children}
    </group>
  );
};

const MovingDirectionalLight = ({ speed = 1 }) => {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed; // Multiply elapsed time by speed
    const range = 5; // Range of movement
    lightRef.current.position.x = Math.sin(time) * range;
  });

  return (
    <directionalLight
      ref={lightRef}
      position={[5, 0, 5]}
      intensity={2}
      color={"#ffffff"}
      castShadow
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
      shadow-bias={-0.002}
    />
  );
};


const Prezentare = () => {
  const isMobile = useIsMobile();

  const disketaMicaPosition1 = isMobile ? [0, -1.8, 0] : [4, 0, 0];
  const disketaMicaPosition2 = isMobile ? [0, -4, 0] : [4, -4, 0];
  const disketaMarePosition = isMobile ? [-0.15, 2.5, 0] : [-5, 0, 0];

  const disketaMicaScale = isMobile ? [0.7, 0.7, 0.7] : [2, 1.3, 1.3];
  const disketaMareScale = isMobile ? [0.7, 0.7, 0.7] : [1.5, 1.5, 1.5];

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }} className="bg-gradient-to-b from-white to-blue-50">
      <Canvas
        shadows
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 10], fov: 50 }}
      >
        <ambientLight intensity={1.2} color={"#fffef0"}/>

        {/* Moving directional light */}
        <MovingDirectionalLight />

        {/* Static secondary directional light */}
        <directionalLight
          position={[-7, 10, 30]}
          intensity={1}
          color={"#40c9ff"}
        />

        <InteractiveDisketa initialPosition={disketaMicaPosition1} floatSpeed={0.5} amplitude={0.2} phaseOffset={0}>
          <DisketaMica1 rotation={[0, -Math.PI / 2, 0]} scale={disketaMicaScale} />
        </InteractiveDisketa>

        <InteractiveDisketa initialPosition={disketaMicaPosition2} floatSpeed={0.6} amplitude={0.25} phaseOffset={1}>
          <DisketaMica2 rotation={[0, -Math.PI / 2, 0]} scale={disketaMicaScale} />
        </InteractiveDisketa>

        <InteractiveDisketa initialPosition={disketaMarePosition} floatSpeed={0.4} amplitude={0.3} phaseOffset={2}>
          <DisketaMare rotation={[0, -Math.PI / 2, 0]} scale={disketaMareScale} />
        </InteractiveDisketa>

        {/* <OrbitControls /> */}
      </Canvas>
    </div>
  );
};

export default Prezentare;
