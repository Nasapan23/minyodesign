'use client';

import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import FakeGlowMaterial from '@/utils/FakeGlowMaterial';

const GLOW_CONFIG = {
  glowColor: "#ffffff",
  glowInternalRadius: 0.5,
  glowSharpness: 0.5,
  falloff: 0.2,
  opacity: 0.6,
  depthTest: true,
};

const ROTATION = [Math.PI / 2, 0, 0];

export default function DisketaBlend({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  ...props
}) {
  const { nodes, materials } = useGLTF('/3DObjects/gd/disketa-blend.glb');

  const meshes = useMemo(() => [
    { id: 'b1', material: 'Material.013' },
    { id: 'b2', material: 'Material.012' },
    { id: 'b3', material: 'Material.011' },
    { id: 'b4', material: 'Material.010' },
    { id: 'b5', material: 'Material.009' },
    { id: 'b5001', material: 'Material.020', glow: true },
    { id: 'b6', material: 'Material.008' },
    { id: 'colt_stanga_jos', material: 'Material.015' },
    { id: 'fundalinterior', material: 'Material.004' },
    { id: 'grafic', material: 'Material.021', glow: true },
    { id: 'panou_logo', material: 'Material.002' },
    { id: 'panou_tema', material: 'Material.006' },
    { id: 'panou_text', material: 'Material.005' },
    { id: 'panou_titlu', material: 'Material.007' },
    { id: 'rama_baterie', material: 'Material.022', glow: true },
    { id: 'rama_dintre', material: 'Material.017', glow: true, glowProps: { glowColor: "#ffffff", glowSharpness: 1, opacity: 1.0 } },
    { id: 'rama_exterioara', glow: true, glowProps: { glowColor: "#53A0C5", glowSharpness: 1, opacity: 1.0 } },
    { id: 'rama_interior', material: 'Material.016', glow: true, glowProps: { glowColor: "#2F6B91", glowSharpness: 0.4, opacity: 1.0 } },
    { id: 'rama_logo', material: 'Material.018', glow: true },
    { id: 'rama_titlu', material: 'Material.023', glow: true },
    { id: 'stanga_spatiugolbaterie', material: 'Material.003', glow: true },
    { id: 'tema_chenar', material: 'Material.019', glow: true },
    { id: 'textdreapta', material: 'Material.001', glow: true },
  ], []);

  return (
    <group position={position} scale={scale} rotation={rotation} {...props} dispose={null}>
      {meshes.map(({ id, material, glow, glowProps }) => (
        <mesh
          key={id}
          castShadow
          receiveShadow
          geometry={nodes[id]?.geometry}
          material={material ? materials[material] : undefined}
          rotation={ROTATION}
        >
          {glow && <FakeGlowMaterial {...GLOW_CONFIG} {...(glowProps || {})} />}
        </mesh>
      ))}
    </group>
  );
}

useGLTF.preload('/3DObjects/gd/disketa-blend.glb');
