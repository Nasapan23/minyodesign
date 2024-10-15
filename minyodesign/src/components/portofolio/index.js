import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { useSwipeable } from 'react-swipeable';
import { DisketaMock } from '@/components/3d-components/diskete-portofoliu/disketa-mock';
import { DisketaAtelier } from "@/components/3d-components/proiecte/gd/disketa-atelier.js"
import { DisketaBlend } from "@/components/3d-components/proiecte/gd/disketa-blend.js";
import { DisketaCrypto} from "@/components/3d-components/proiecte/gd/disketa-crypto.js";
import { DisketaCulinary} from "@/components/3d-components/proiecte/gd/disketa-culinary.js";
import { DisketaLiftUp } from "@/components/3d-components/proiecte/gd/disketa-liftup.js";
import { PointLightHelper, DirectionalLightHelper } from 'three';

const models = [DisketaAtelier, DisketaBlend, DisketaCrypto, DisketaCulinary, DisketaLiftUp];

function LightHelpers({ pointLightRef, directionalLightRef }) {
  const { scene } = useThree();

  // Adding helpers to the scene when the component mounts
  useMemo(() => {
    if (pointLightRef.current) {
      const pointLightHelper = new PointLightHelper(pointLightRef.current, 1);
      scene.add(pointLightHelper);
    }
    if (directionalLightRef.current) {
      const directionalLightHelper = new DirectionalLightHelper(directionalLightRef.current, 1);
      scene.add(directionalLightHelper);
    }
  }, [scene, pointLightRef, directionalLightRef]);

  return null;
}

export default function Carousel() {
  const [activeIndex, setActiveIndex] = useState(Math.floor(models.length / 2));

  // Refs for lights to attach helpers
  const pointLightRef = useRef();
  const directionalLightRef = useRef();

  // Swipeable handlers
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

  // Calculate positions and scales for each item based on activeIndex
  const positions = useMemo(() => {
    return models.map((_, index) => {
      const offset = index - activeIndex;
      const scaleFactor = Math.max(0.5, 1 - Math.abs(offset) * 0.2);
      const scale = [scaleFactor, scaleFactor, scaleFactor];
      const zPosition = -2 - Math.abs(offset);
      const xPosition = offset * 4;
      const position = offset === 0 ? [0, -5, -1] : [xPosition, -5, zPosition];
      return { position, scale };
    });
  }, [activeIndex]);

  return (
    <div
      {...handlers}
      className="flex justify-center items-center h-screen w-full bg-black"
    >
      <div className="w-full h-full">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight ref={pointLightRef} position={[5, -10, 10]} intensity={100} color={"#ff758f"}/>
          <directionalLight ref={directionalLightRef} position={[5, -10, 13]} intensity={1} />

          {models.map((ModelComponent, index) => {
            const { position, scale } = positions[index];

            const { animatedPosition, animatedScale } = useSpring({
              animatedPosition: position,
              animatedScale: scale,
              config: { tension: 300, friction: 30 },
            });

            return (
              <animated.group
                key={index}
                position={animatedPosition.to((x, y, z) => [x, y, z])}
                rotation={[0, -Math.PI / 2, 0]}
                scale={animatedScale}
              >
                <ModelComponent />
              </animated.group>
            );
          })}
        </Canvas>
      </div>
    </div>
  );
}
