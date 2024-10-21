"use client";

import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useSwipeable } from 'react-swipeable';
import { DisketaMock } from '@/components/3d-components/diskete-portofoliu/disketa-mock';
import { DisketaAtelier } from "@/components/3d-components/proiecte/gd/disketa-atelier.js";
import { DisketaBlend } from "@/components/3d-components/proiecte/gd/disketa-blend.js";
import { DisketaCrypto } from "@/components/3d-components/proiecte/gd/disketa-crypto.js";
import { DisketaCulinary } from "@/components/3d-components/proiecte/gd/disketa-culinary.js";
import { DisketaLiftUp } from "@/components/3d-components/proiecte/gd/disketa-liftup.js";
import { DisketaOala } from "@/components/3d-components/proiecte/gd/disketa-oala.js";
import { DisketaPhotomad } from '../3d-components/proiecte/gd/disketa-photomad';
import { DisketaPiggy } from '../3d-components/proiecte/gd/disketa-piggy';
import { DisketaPizza } from '../3d-components/proiecte/gd/disketa-pizza';
import { DisketaSteam } from '../3d-components/proiecte/gd/disketa-steam';
import { DisketaTargoviste } from '../3d-components/proiecte/gd/disketa-targoviste';
import { DisketaUnarte } from '../3d-components/proiecte/gd/disketa-unarte';
import { TitluGD } from '../3d-components/proiecte/titlu/titlu-gd';
import { OrbitControls } from '@react-three/drei';
import useIsMobile from '@/hooks/UseIsMobile';
import * as THREE from 'three';

const models = [DisketaAtelier, DisketaBlend, DisketaCrypto, DisketaCulinary, DisketaLiftUp, DisketaOala, DisketaPhotomad, DisketaPiggy, DisketaPizza, DisketaSteam, DisketaTargoviste, DisketaUnarte];

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
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouseY * rotationScaleX, 0.1);
      ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mouseX * rotationScaleY, 0.1);
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

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(models.length / 2));

  const pointLightRef = useRef();
  const directionalLightRef = useRef();

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % models.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
  };

  const positions = useMemo(() => {
    return models.map((_, index) => {
      const offset = index - activeIndex;
      const scaleFactor = Math.max(0.5, 1 - Math.abs(offset) * 0.2);
      const scale = [scaleFactor * 2, scaleFactor * 0.9, scaleFactor * 0.9];
      const zPosition = -2 - Math.abs(offset);
      const xPosition = offset * 2.5;
      const position = offset === 0 ? [0, -2.7, -1] : [xPosition, -2.7, zPosition];
      return { position, scale };
    });
  }, [activeIndex]);

  return (
    <div {...handlers} className="flex justify-center items-center h-screen w-full bg-black pb-8">
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight ref={pointLightRef} position={[5, -10, 10]} intensity={100} color={"#ff758f"} />
          <directionalLight ref={directionalLightRef} position={[5, -10, 13]} intensity={1} />

          {models.map((ModelComponent, index) => {
            const { position, scale } = positions[index];

            const { animatedPosition, animatedScale } = useSpring({
              animatedPosition: position,
              animatedScale: scale,
              config: { tension: 300, friction: 30 },
            });

            return (
              <InteractiveDisketa
                key={index}
                initialPosition={position}
                floatSpeed={0.5}
                amplitude={0.2}
                phaseOffset={index}
              >
                <animated.group
                  position={animatedPosition.to((x, y, z) => [x, y, z])}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={animatedScale}
                >
                  <ModelComponent />
                </animated.group>
              </InteractiveDisketa>
            );
          })}

          <InteractiveDisketa initialPosition={[-1, -1, 0]} floatSpeed={0.5} amplitude={0.2} phaseOffset={0}>
            <TitluGD  rotation={[0, -Math.PI / 2, 0]} scale={[0.8, 0.8, 0.8]} />
          </InteractiveDisketa>
        </Canvas>
      </div>
    </div>
  );
}