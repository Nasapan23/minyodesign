import React from 'react'
import { useGLTF } from '@react-three/drei'
import FakeGlowMaterial from '@/utils/FakeGlowMaterial'

export default function TitluGD({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], ...props }) {
  const { nodes, materials } = useGLTF('/3DObjects/titlu/titlu-gd.glb')

  return (
    <group position={position} scale={scale} rotation={rotation} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.holograma.geometry}
        material={materials['Material.006']}
        rotation={[Math.PI / 2, 0, 0]}
      >
      <FakeGlowMaterial
          glowColor="#53A0C5" // Blue color
          glowInternalRadius={0.5}
          glowSharpness={0.8}
          falloff={0.2}
          opacity={1.0}
          depthTest={true}
        />
      </mesh>
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
  )
}

useGLTF.preload('/3DObjects/titlu/titlu-gd.glb')
