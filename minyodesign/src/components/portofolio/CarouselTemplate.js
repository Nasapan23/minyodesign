'use client';
import React, { useState, useMemo, useRef, Suspense, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useSwipeable } from 'react-swipeable';
import useIsMobile from '@/hooks/UseIsMobile';
import * as THREE from 'three';
import Modal from './Modal';
import LoadingScreen from '../loadingScreen';

// Interactive Disketa Component
const InteractiveDisketa = React.memo(({ children, initialPosition, floatSpeed = 0.5, amplitude = 0.2, phaseOffset = 0, onClick }) => {
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
      onClick={onClick}
    >
      {children}
    </group>
  );
});

// Carousel Component
export default function Carousel({ models, mapping, titleComponent: TitleComponent }) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(models.length / 2));
  const [modalData, setModalData] = useState(null);
  const isMobile = useIsMobile();

  const pointLightRef = useRef();
  const directionalLightRef = useRef();

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % models.length);
  }, [models.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
  }, [models.length]);

  const openModal = useCallback((name) => {
    const modalContent = mapping[name];
    if (modalContent) {
      setModalData({ name, ...modalContent });
    }
  }, [mapping]);

  const closeModal = useCallback(() => {
    setModalData(null);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const positions = useMemo(() => {
    return models.map((_, index) => {
      const offset = index - activeIndex;
      const baseScaleFactor = isMobile ? 0.4 : 0.5;
      const scaleFactor = Math.max(baseScaleFactor, 1 - Math.abs(offset) * 0.2);
      const scale = isMobile ? [scaleFactor * 1.5, scaleFactor * 0.7, scaleFactor * 0.7] : [scaleFactor * 2, scaleFactor * 0.9, scaleFactor * 0.9];
      const zPosition = isMobile ? -2 - Math.abs(offset) * 0.5 : -2 - Math.abs(offset);
      const xPosition = offset * (isMobile ? 1.5 : 2.5);
      const yPosition = isMobile ? -1.7 : -2.7;
      const position = offset === 0 ? [0, yPosition, -1] : [xPosition, yPosition, zPosition];
      return { position, scale };
    });
  }, [activeIndex, isMobile, models.length]);

  return (
    <div {...handlers} className={`relative flex justify-center items-center ${isMobile ? 'h-[50vh]' : 'h-screen'} w-full bg-blue-50`}>
      <div className="relative z-10 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 10], fov: isMobile ? 45 : 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }} // Ensures the canvas background is transparent
        >
          <ambientLight intensity={0.5} />
          <pointLight ref={pointLightRef} position={[5, -10, 10]} intensity={100} color={"#ff758f"} />
          <directionalLight ref={directionalLightRef} position={[5, -10, 13]} intensity={1} />

          {models.map((model, index) => {
            const { position, scale } = positions[index];
            const { component: ModelComponent, name } = model;

            const { animatedPosition, animatedScale } = useSpring({
              animatedPosition: position,
              animatedScale: scale,
              config: { tension: 200, friction: 30 },
            });

            return (
              <InteractiveDisketa
                key={index}
                initialPosition={position}
                floatSpeed={0.5}
                amplitude={0.2}
                phaseOffset={index}
                onClick={() => openModal(name)}
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

          {/* Render the passed title component */}
          <InteractiveDisketa initialPosition={[-1, isMobile ? -0.2 : -1, 0]} floatSpeed={0.5} amplitude={0.2} phaseOffset={0}>
            <TitleComponent rotation={[-0.2, -Math.PI / 2, 0]} scale={[isMobile ? 1 : 1.5, 0.8, 0.8]} />
          </InteractiveDisketa>
        </Canvas>
      </div>

      {modalData && (
        <Modal
          id={modalData.name}
          name={modalData.name}
          logo={modalData.logo}
          description={modalData.description}
          images={modalData.images}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
