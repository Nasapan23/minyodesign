'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import CarteVizitaModel from '../3d-components/carte-de-vizita';
import TitluContact from '../3d-components/proiecte/titlu/titlu-contact';
import useIsMobile from '@/hooks/UseIsMobile';
import * as THREE from 'three';

const InteractiveDisketa = React.memo(function InteractiveDisketa({
  children,
  initialPosition,
  floatSpeed = 0.5,
  amplitude = 0.2,
  phaseOffset = 0,
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const originalRotation = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse, viewport } = state;
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    if (hovered && !isMobile) {
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouseY * 0.02, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouseX * 0.02, 0.1);
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
});

const FloatingCard = ({ position, rotation, scale }) => {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);

  const randomOffsetX = useRef(Math.random() * Math.PI * 2);
  const randomOffsetY = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const floatX = Math.sin(elapsedTime * 1.5 + randomOffsetX.current) * 0.1;
    const floatY = Math.cos(elapsedTime * 1.2 + randomOffsetY.current) * 0.1;

    const targetX = hovered ? position[0] + 0.3 : position[0] + floatX;
    const targetY = position[1] + floatY;

    cardRef.current.position.x += (targetX - cardRef.current.position.x) * 0.1;
    cardRef.current.position.y += (targetY - cardRef.current.position.y) * 0.1;

    if (hovered) {
      cardRef.current.rotation.x += (rotation[0] - cardRef.current.rotation.x) * 0.1;
      cardRef.current.rotation.y += (rotation[1] + Math.sin(elapsedTime * 3) * 0.05 - cardRef.current.rotation.y) * 0.1;
    } else {
      cardRef.current.rotation.x += (rotation[0] - cardRef.current.rotation.x) * 0.1;
      cardRef.current.rotation.y += (rotation[1] - cardRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group
      ref={cardRef}
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <CarteVizitaModel />
    </group>
  );
};

const CarteDeVizitaPart = () => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex ${isMobile ? 'flex-col items-center' : 'items-center justify-center'} h-screen`}>
      <div style={{ height: '100vh', width: '100vw', top: 0, left: 0 }}>
        <Canvas
          shadows
          gl={{ alpha: true }}
          camera={{ position: [0, 0, 10], fov: 50 }}
        >
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 10]} intensity={1} color="#ffffff" />
          <directionalLight position={[5, 10, 13]} intensity={1} />
          <directionalLight position={[0, 0, 1]} intensity={0.3} color="#ffffff" />

          {/* Interactive Title */}
          <InteractiveDisketa
            initialPosition={[isMobile ? -0.5 : -1.25, isMobile ? 2.3 : -1, 0]} // Adjusted position for mobile
            floatSpeed={0.5}
            amplitude={0.2}
            phaseOffset={0}
          >
            <TitluContact
              rotation={[-0.15, -Math.PI / 2, 0]}
              scale={isMobile ? [0.4, 0.4, 0.4] : [1, 0.9, 0.9]} // Scale down for mobile
            />
          </InteractiveDisketa>

          {/* Floating cards */}
          <FloatingCard
            position={[isMobile ? -1.7 : 0, isMobile ? 1 : -2, 0]} // Adjusted vertical stacking for mobile
            rotation={[0, 0, -Math.PI / 6 + 0.3]}
            scale={[isMobile ? 0.035 : 0.06, isMobile ? 0.035 : 0.06, isMobile ? 0.035 : 0.06]} // Scale down cards for mobile
          />
          <FloatingCard
            position={[isMobile ? 1.7  : 0, isMobile ? -2 : -2.5, -0.5]} // Place one card below another for mobile
            rotation={[0, Math.PI, -Math.PI / 6 + 0.3]}
            scale={[isMobile ? 0.035 : 0.06, isMobile ? 0.035 : 0.06, isMobile ? 0.035 : 0.06]} // Scale down cards for mobile
          />
        </Canvas>
      </div>
    </div>
  );
};

export default CarteDeVizitaPart;
