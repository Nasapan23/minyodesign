"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import CarteVizitaModel from "../3d-components/carte-de-vizita";
import TitluContact from "../3d-components/proiecte/titlu/titlu-contact";
import useIsMobile from "@/hooks/UseIsMobile";
import * as THREE from "three";
import FloatingClouds from "../floating-cloud";

// InteractiveDisketa
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
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        mouseY * 0.02,
        0.1
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        mouseX * 0.02,
        0.1
      );
    } else {
      ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        originalRotation.x,
        0.1
      );
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        originalRotation.y,
        0.1
      );
    }

    ref.current.position.y =
      initialPosition[1] + Math.sin(time * floatSpeed + phaseOffset) * amplitude;
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

// FloatingCard
const FloatingCard = ({ position, rotation, scale }) => {
  const cardRef = useRef();
  const [hovered, setHovered] = useState(false);
  const randomOffsetX = useRef(Math.random() * Math.PI * 2);
  const randomOffsetY = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const floatX = Math.sin(elapsedTime * 1.5 + randomOffsetX.current) * 0.1;
    const floatY = Math.cos(elapsedTime * 1.2 + randomOffsetY.current) * 0.1;

    // On hover, shift the card slightly to the right
    const targetX = hovered ? position[0] + 0.3 : position[0] + floatX;
    const targetY = position[1] + floatY;

    cardRef.current.position.x += (targetX - cardRef.current.position.x) * 0.1;
    cardRef.current.position.y += (targetY - cardRef.current.position.y) * 0.1;

    if (hovered) {
      cardRef.current.rotation.x +=
        (rotation[0] - cardRef.current.rotation.x) * 0.1;
      cardRef.current.rotation.y +=
        (rotation[1] + Math.sin(elapsedTime * 3) * 0.05 - cardRef.current.rotation.y) * 0.1;
    } else {
      cardRef.current.rotation.x +=
        (rotation[0] - cardRef.current.rotation.x) * 0.1;
      cardRef.current.rotation.y +=
        (rotation[1] - cardRef.current.rotation.y) * 0.1;
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

// Main Component
export default function CarteDeVizitaPart() {
  const isMobile = useIsMobile();

  // Title scale smaller on mobile
  const titleScale = isMobile ? [0.45, 0.45, 0.45] : [1, 0.9, 0.9];

  const titlePosition = isMobile ? [-0.5, 2, 0] : [-1, -1, 0];


  // Different positions & scales for mobile vs. desktop
  const cardScale = isMobile ? [0.035, 0.035, 0.035] : [0.06, 0.06, 0.06];

  // Stack the cards vertically on mobile (one under the other).
  const cardPositions = isMobile
    ? [
        [-1.5, 1, 0],    // first card on mobile
        [1.5, -2.4, 0],  // second card on mobile
      ]
    : [
        [0, -2, 0],        // first card on desktop
        [0, -2.5, -0.5],   // second card on desktop
      ];

  return (
    <div className="relative w-screen h-screen">
      {/* Clouds behind everything (z-0) */}
      <div className="absolute inset-0 z-0">
        <FloatingClouds
          cloudNumber={5}
          minSize={1}
          maxSize={1.7}
          minSpeed={80}
          maxSpeed={100}
        />
      </div>

      {/* Canvas on top (z-10) */}
      <div className="absolute inset-0 z-10">
        <Canvas shadows gl={{ alpha: true }} camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 10]} intensity={1} color="#ffffff" />
          <directionalLight position={[5, 10, 13]} intensity={1} />
          <directionalLight position={[0, 0, 1]} intensity={0.3} color="#ffffff" />

          {/* Interactive Title */}
          <InteractiveDisketa
            initialPosition={titlePosition}
            floatSpeed={0.5}
            amplitude={0.2}
          >
            <TitluContact rotation={[-0.15, -Math.PI / 2, 0]} scale={titleScale} />
          </InteractiveDisketa>

          {/* Floating cards (adjusted for mobile & desktop) */}
          <FloatingCard
            position={cardPositions[0]}
            rotation={[0, 0, -Math.PI / 6 + 0.3]}
            scale={cardScale}
          />
          <FloatingCard
            position={cardPositions[1]}
            rotation={[0, Math.PI, -Math.PI / 6 + 0.3]}
            scale={cardScale}
          />
        </Canvas>
      </div>
    </div>
  );
}
