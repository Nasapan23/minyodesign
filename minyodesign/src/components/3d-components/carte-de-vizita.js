'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function CarteDeVizita({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  ...props
}) {
  const { nodes, materials } = useGLTF('/3DObjects/carte-de-vizita.glb'); // Ensure the correct GLTF file is referenced

  return (
    <group position={position} scale={scale} rotation={rotation} {...props} dispose={null}>
      {/* First Mesh */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.003']}
        position={[44.681, 25.187, -5.683]}
        scale={[43.028, 24.922, 0.312]}
      />
      {/* Second Mesh */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials['Material.004']}
        position={[44.681, 25.187, -6.367]}
        scale={[43.028, 24.922, 0.312]}
      />
    </group>
  );
}

useGLTF.preload('/3DObjects/carte-de-vizita.glb');
