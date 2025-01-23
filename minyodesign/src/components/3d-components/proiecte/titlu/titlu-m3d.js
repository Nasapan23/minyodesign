'use client';

import React from 'react';
import { useGLTF } from '@react-three/drei';

export default function TitluM3D({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], ...props }) {
  const { nodes, materials } = useGLTF('/3DObjects/titlu/titlu-m3d.glb');

  // Increase reflectiveness for all relevant materials
  const reflectiveMaterials = ['Material.006', 'Material.005', 'Material.007', 'Material.004'];
  reflectiveMaterials.forEach((matName) => {
    if (materials[matName]) {
      materials[matName].metalness = 1; // Increase reflectiveness (close to metallic)
      materials[matName].roughness = 0.5; // Reduce roughness for a shinier surface
    }
  });

  return (
    <group position={position} scale={scale} rotation={rotation} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.holograma.geometry}
        material={materials['Material.006']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_interioara.geometry}
        material={materials['Material.005']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_interioara001.geometry}
        material={materials['Material.007']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.textbox.geometry}
        material={materials['Material.004']}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/3DObjects/titlu/titlu-m3d.glb');
