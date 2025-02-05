'use client';
import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import useIsMobile from '@/hooks/UseIsMobile';
import * as THREE from 'three';

// Import the FloatingClouds component
import FloatingClouds from '../floating-cloud';

const InteractiveDisketa = React.memo(function InteractiveDisketa({
  children,
  initialPosition,
  floatSpeed = 0.5,
  amplitude = 0.2,
  phaseOffset = 0,
  onClick
}) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  const originalRotation = new THREE.Vector3(0, 0, 0);

  const pointerStart = useRef({ x: 0, y: 0 });
  const pointerMoved = useRef(false);

  const handlePointerDown = (event) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    pointerMoved.current = false;
  };

  const handlePointerMove = (event) => {
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    if (Math.sqrt(dx * dx + dy * dy) > 5) {
      pointerMoved.current = true;
    }
  };

  const handlePointerUp = () => {
    if (!pointerMoved.current) {
      onClick?.();
    }
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { mouse, viewport } = state;
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;

    // Rotate the model slightly in response to the mouse.
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
      // return to original rotation
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

    // Floating effect: just offset the Y position with sine.
    ref.current.position.y =
      initialPosition[1] + Math.sin(time * floatSpeed + phaseOffset) * amplitude;
  });

  return (
    <group
      ref={ref}
      position={initialPosition}
      onPointerOver={() => !isMobile && setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {children}
    </group>
  );
});

export default function Carousel({ models, titleComponent: TitleComponent }) {
  const [activeIndex, setActiveIndex] = useState(Math.floor(models.length / 2));
  const isMobile = useIsMobile();
  const router = useRouter();

  const handleNext = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % models.length);
  }, [models.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + models.length) % models.length);
  }, [models.length]);

  const handleNavigation = useCallback(
    (projectName) => {
      router.push(`/portofolio/${projectName}`);
    },
    [router]
  );

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Precompute positions & scales for each model, based on the activeIndex.
  const positions = useMemo(() => {
    return models.map((_, index) => {
      const offset = index - activeIndex;
      const baseScaleFactor = isMobile ? 0.4 : 0.5;
      const scaleFactor = Math.max(baseScaleFactor, 1 - Math.abs(offset) * 0.2);

      const scale = isMobile
        ? [scaleFactor * 1.5, scaleFactor * 0.7, scaleFactor * 0.7]
        : [scaleFactor * 2, scaleFactor * 0.9, scaleFactor * 0.9];

      const zPosition = isMobile
        ? -2 - Math.abs(offset) * 0.5
        : -2 - Math.abs(offset);

      const xPosition = offset * (isMobile ? 1.5 : 2.5);
      const yPosition = isMobile ? -1.7 : -2.7;
      const position = offset === 0 ? [0, yPosition, -1] : [xPosition, yPosition, zPosition];

      return { position, scale };
    });
  }, [activeIndex, isMobile, models.length]);

  return (
    <div
      {...handlers}
      className={`relative w-full flex justify-center items-center ${
        isMobile ? 'h-[50vh]' : 'h-screen'
      } bg-blue-50`}
    >
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
      <div className="relative z-10 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          {/* A few lights to brighten things up */}
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 10]} intensity={1} color="#40c9ff" />
          <directionalLight position={[5, 10, 13]} intensity={1} />
          <directionalLight position={[0, 0, 1]} intensity={0.3} color="#40c9ff" />

          {/* Our array of 3D models */}
          {models.map((model, index) => {
            const { position, scale } = positions[index];
            const { component: ModelComponent, name } = model;

            const springProps = useSpring({
              position,
              scale,
              config: { tension: 200, friction: 30 }
            });

            return (
              <InteractiveDisketa
                key={index}
                initialPosition={position}
                floatSpeed={0.5}
                amplitude={0.2}
                phaseOffset={index}
                onClick={() => handleNavigation(name)}
              >
                <animated.group
                  position={springProps.position.to((x, y, z) => [x, y, z])}
                  rotation={[0, -Math.PI / 2, 0]}
                  scale={springProps.scale}
                >
                  <ModelComponent />
                </animated.group>
              </InteractiveDisketa>
            );
          })}

          {/* Title component, also floating */}
          <InteractiveDisketa
            initialPosition={[-1, isMobile ? -0.2 : -1, 0]}
            floatSpeed={0.5}
            amplitude={0.2}
            phaseOffset={0}
          >
            <TitleComponent
              rotation={[-0.15, -Math.PI / 2, 0]}
              scale={[isMobile ? 1 : 1.5, 0.8, 0.8]}
            />
          </InteractiveDisketa>
        </Canvas>
      </div>
    </div>
  );
}
