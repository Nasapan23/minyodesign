import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import FakeGlowMaterial from '@/utils/FakeGlowMaterial';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils';
import * as THREE from 'three';

function DisketaAtelier({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  ...props
}) {
  const { nodes = {}, materials = {} } = useGLTF('/3DObjects/gd/disketa-atelier.glb');

  const mergedGeometry = useMemo(() => {
    if (!nodes.b1 || !nodes.b2 || !nodes.b3 || !nodes.b4 || !nodes.b5) return null;
    return mergeBufferGeometries(
      [
        nodes.b1.geometry,
        nodes.b2.geometry,
        nodes.b3.geometry,
        nodes.b4.geometry,
        nodes.b5.geometry,
      ],
      false
    );
  }, [nodes]);

  useEffect(() => {
    return () => {
      if (mergedGeometry) mergedGeometry.dispose();
    };
  }, [mergedGeometry]);

  const sharedMaterial = materials['Material.013'];

  if (!nodes || !materials) {
    console.error('GLTF file did not load correctly. Check the file path or structure.');
    return null;
  }

  return (
    <group position={position} scale={scale} rotation={rotation} {...props} dispose={null}>
      <primitive object={new THREE.LOD()}>
        {/* High-resolution mesh */}
        {mergedGeometry && (
          <mesh
            castShadow
            receiveShadow
            geometry={mergedGeometry}
            material={sharedMaterial}
            rotation={[Math.PI / 2, 0, 0]}
            onUpdate={(self) => self.addLevel(self, 0)} // Add high-res mesh as first level
          />
        )}

        {/* Lower-resolution mesh */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.b1?.geometry || null}
          material={sharedMaterial}
          scale={[0.5, 0.5, 0.5]}
          rotation={[Math.PI / 2, 0, 0]}
          onUpdate={(self) => self.addLevel(self, 50)} // Add low-res mesh as second level
        />
      </primitive>

      {/* Additional independent meshes */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.rama_exterioara?.geometry || null}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <FakeGlowMaterial
          glowColor="#53A0C5"
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
        geometry={nodes.rama_interior?.geometry || null}
        material={materials['Material.016']}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <FakeGlowMaterial
          glowColor="#2F6B91"
          glowInternalRadius={0.5}
          glowSharpness={0.4}
          falloff={0.2}
          opacity={1.0}
          depthTest={true}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload('/3DObjects/gd/disketa-atelier.glb');

export default React.memo(DisketaAtelier);
