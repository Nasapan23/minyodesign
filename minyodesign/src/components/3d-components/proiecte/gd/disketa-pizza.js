'use client';
import React from 'react'
import { useGLTF } from '@react-three/drei'
import FakeGlowMaterial from '@/utils/FakeGlowMaterial'

export default function DisketaPizza({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0], ...props }) {
  const { nodes, materials } = useGLTF('/3DObjects/gd/disketa-pizza.glb')

  return (
    <group position={position} scale={scale} rotation={rotation} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b1.geometry}
        material={materials['Material.013']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b2.geometry}
        material={materials['Material.012']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b3.geometry}
        material={materials['Material.011']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b4.geometry}
        material={materials['Material.010']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b5.geometry}
        material={materials['Material.009']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b5001.geometry}
        material={materials['Material.020']}
        rotation={[Math.PI / 2, 0, 0]}
      >
              <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.b6.geometry}
        material={materials['Material.008']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.colt_stanga_jos.geometry}
        material={materials['Material.015']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.fundalinterior.geometry}
        material={materials['Material.004']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.grafic.geometry}
        material={materials['Material.021']}
        rotation={[Math.PI / 2, 0, 0]}
      >
       <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.panou_logo.geometry}
        material={materials['Material.002']}
        rotation={[Math.PI / 2, 0, 0]}
      >
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.panou_tema.geometry}
        material={materials['Material.006']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.panou_text.geometry}
        material={materials['Material.005']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.panou_titlu.geometry}
        material={materials['Material.007']}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_baterie.geometry}
        material={materials['Material.022']}
        rotation={[Math.PI / 2, 0, 0]}
      >
      <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_dintre.geometry}
        material={materials['Material.017']}
        rotation={[Math.PI / 2, 0, 0]}
     >
        <FakeGlowMaterial
          glowColor="#fffff" // Blue color
          glowInternalRadius={0.5}
          glowSharpness={1}
          falloff={0.2}
          opacity={1.0}
          depthTest={true}
        />
     </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_exterioara.geometry}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <FakeGlowMaterial
          glowColor="#53A0C5" // Blue color
          glowInternalRadius={0.5}
          glowSharpness={1}
          falloff={0.2}
          opacity={1.0}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_interior.geometry}
        material={materials['Material.016']}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <FakeGlowMaterial
          glowColor="#2F6B91" // Blue color
          glowInternalRadius={0.5}
          glowSharpness={0.4}
          falloff={0.2}
          opacity={1.0}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_logo.geometry}
        material={materials['Material.018']}
        rotation={[Math.PI / 2, 0, 0]}
      >
              <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_titlu.geometry}
        material={materials['Material.023']}
        rotation={[Math.PI / 2, 0, 0]}
      >
              <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stanga_spatiugolbaterie.geometry}
        material={materials['Material.003']}
        rotation={[Math.PI / 2, 0, 0]}
      >
              <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
        </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.tema_chenar.geometry}
        material={materials['Material.019']}
        rotation={[Math.PI / 2, 0, 0]}
      >
              <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.textdreapta.geometry}
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, 0]}
      >
              <FakeGlowMaterial
          glowColor="#fffff"
          glowInternalRadius={0.5}
          glowSharpness={0.5}
          falloff={0.2}
          opacity={0.6}
          depthTest={true}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/3DObjects/gd/disketa-pizza.glb')
