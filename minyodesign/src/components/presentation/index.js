"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { DisketaMica1 } from "@/components/3d-components/disketa-mica-1";
import { DisketaMica2 } from "@/components/3d-components/disketa-mica-2";
import DisketaMare from "@/components/3d-components/disketa-mare";
import useIsMobile from "@/hooks/UseIsMobile";
import * as THREE from "three";

// Import your FloatingClouds component
import FloatingClouds from "../floating-cloud";

const raycaster = new THREE.Raycaster();
const mouseVector = new THREE.Vector2();

const InteractiveDisketa = ({
  children,
  initialPosition,
  floatSpeed = 0.5,
  amplitude = 0.2,
  phaseOffset = 0,
}) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const originalRotation = new THREE.Vector3(0, 0, 0);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse, viewport } = state;
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    // Rotate on hover (if not on mobile)
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
      // Return to original rotation
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

    // Floating effect
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
};

const MovingDirectionalLight = ({ speed = 1 }) => {
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime() * speed;
    const range = 5;
    lightRef.current.position.x = Math.sin(time) * range;
  });

  return (
    <directionalLight
      ref={lightRef}
      position={[5, 0, 5]}
      intensity={2}
      color="#ffffff"
      castShadow
      shadow-mapSize-width={256}
      shadow-mapSize-height={256}
      shadow-bias={-0.002}
    />
  );
};

export default function Prezentare() {
  const isMobile = useIsMobile();

  // Positions & scales for each disketa depending on mobile or desktop
  const disketaMicaPosition1 = isMobile ? [0, -1.8, 0] : [4, 0, 0];
  const disketaMicaPosition2 = isMobile ? [0, -4, 0] : [4, -4, 0];
  const disketaMarePosition = isMobile ? [-0.15, 2.5, 0] : [-5, 0, 0];

  const disketaMicaScale = isMobile ? [0.7, 0.7, 0.7] : [2, 1.3, 1.3];
  const disketaMareScale = isMobile ? [0.7, 0.7, 0.7] : [1.5, 1.5, 1.5];

  return (
    <div
      style={{ height: "100vh", width: "100vw", position: "relative" }}
      className="bg-gradient-to-b from-white to-blue-50"
    >
      {/* Clouds behind everything */}
      <div className="absolute inset-0 z-0">
        <FloatingClouds
          cloudNumber={5}
          minSize={1}
          maxSize={1.7}
          minSpeed={80}
          maxSpeed={100}
        />
      </div>

      {/* 3D scene on top */}
      <div className="relative z-10 w-full h-full">
        <Canvas shadows gl={{ alpha: true }} camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={1.2} color="#fffef0" />
          <MovingDirectionalLight speed={1} />
          <directionalLight position={[-7, 10, 30]} intensity={1} color="#40c9ff" />

          {/* Disketa #1 */}
          <InteractiveDisketa
            initialPosition={disketaMicaPosition1}
            floatSpeed={0.5}
            amplitude={0.2}
            phaseOffset={0}
          >
            <DisketaMica1 rotation={[0, -Math.PI / 2, 0]} scale={disketaMicaScale} />
          </InteractiveDisketa>

          {/* Disketa #2 */}
          <InteractiveDisketa
            initialPosition={disketaMicaPosition2}
            floatSpeed={0.6}
            amplitude={0.25}
            phaseOffset={1}
          >
            <DisketaMica2 rotation={[0, -Math.PI / 2, 0]} scale={disketaMicaScale} />
          </InteractiveDisketa>

          {/* Disketa mare */}
          <InteractiveDisketa
            initialPosition={disketaMarePosition}
            floatSpeed={0.4}
            amplitude={0.3}
            phaseOffset={2}
          >
            <DisketaMare rotation={[0, -Math.PI / 2, 0]} scale={disketaMareScale} />
          </InteractiveDisketa>

          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
}
