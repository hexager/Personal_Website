import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function VoxelGrid({ count = 8, separation = 0.4 }) {
  const mesh = useRef();

  const positions = useMemo(() => {
    const temp = [];
    const offset = (count * separation) / 2; 

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        for (let z = 0; z < count; z++) {

          if (Math.random() > 0.6) { // 40% density (60% empty space)
            temp.push(
              x * separation - offset, 
              y * separation - offset, 
              z * separation - offset
            );
          }
        }
      }
    }
    return new Float32Array(temp);
  }, [count, separation]);

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.1;
    mesh.current.rotation.y += delta * 0.15;
    
    const t = state.clock.getElapsedTime();
    mesh.current.scale.setScalar(1 + Math.sin(t) * 0.05);
  });

  return (
    <group rotation={[Math.PI / 4, Math.PI / 4, 0]}>
      <Points ref={mesh} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#DC2626"   
          size={0.06}       
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>
    </group>
  );
}

export default function SparseCubeCanvas() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full opacity-50">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        {/*Does not really matter, I just kept it cuz it seems to be what you do */}
        <VoxelGrid />
      </Canvas>
    </div>
  );
}
