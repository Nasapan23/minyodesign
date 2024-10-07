import React from 'react';
import { useGLTF } from '@react-three/drei';

export function DisketaMare({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) {
  const { nodes, materials } = useGLTF('/3DObjects/Disketa-mare.glb');
  
  return (
    <group position={position} scale={scale} rotation={rotation} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_exterioara.geometry}
        material={materials['Material.002']}
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
        geometry={nodes.chestie_rama_jos.geometry}
        material={materials['Material.004']}
        rotation={[Math.PI / 2, 0, 0]}
      />
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
        geometry={nodes.spate.geometry}
        material={nodes.spate.material}
        position={[-0.049, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload('/3DObjects/Disketa-mare.glb');

export default DisketaMare;
