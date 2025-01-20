import React from 'react';
import { useGLTF } from '@react-three/drei';
import FakeGlowMaterial from '@/utils/FakeGlowMaterial';

export function DisketaMica2({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) {

  const { nodes, materials } = useGLTF('/3DObjects/Disketa-mica-2.glb');
  if (materials['Material.001']) {
    materials['Material.001'].metalness = 0.3; // Lower reflectiveness (0 is non-metallic)
    materials['Material.001'].roughness = 0.7; // Increase roughness (1 is fully rough)
  }

  if (materials['Material.002']) {
    materials['Material.002'].metalness = 0.3; // Lower reflectiveness (0 is non-metallic)
    materials['Material.002'].roughness = 0.5; // Increase roughness (1 is fully rough)
  }
  return (
    <group position={position} scale={scale} rotation={rotation} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_exterioara.geometry}
        material={materials['Material.002']}
        rotation={[Math.PI / 2, 0, 0]}
      >
        {/* <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        /> */}
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.view.geometry}
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_interioara.geometry}
        material={materials['Material.003']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_dreapta.geometry}
        material={materials['Material.004']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.spate.geometry}
        material={nodes.spate.material}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.42, 1, 1]}
      />
    </group>
  );
}

useGLTF.preload('/3DObjects/Disketa-mica-2.glb');

export default DisketaMica2;
