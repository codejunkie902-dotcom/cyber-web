'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Stars, Float, Torus } from '@react-three/drei';
import * as THREE from 'three';

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y -= 0.002;
      wireRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group>
      {/* Core globe */}
      <Sphere ref={meshRef} args={[1.8, 64, 64]}>
        <MeshDistortMaterial
          color="#001833"
          emissive="#003366"
          emissiveIntensity={0.2}
          metalness={0.8}
          roughness={0.2}
          distort={0.08}
          speed={1.5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere ref={wireRef} args={[1.85, 20, 20]}>
        <meshBasicMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>

      {/* Outer glow sphere */}
      <Sphere args={[2.1, 32, 32]}>
        <meshBasicMaterial
          color="#00a8ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function NetworkNodes() {
  const count = 40;
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.9;
      pts.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return pts;
  }, []);

  return (
    <group>
      {points.map((pos, i) => (
        <Float key={i} speed={1.5 + i * 0.1} rotationIntensity={0} floatIntensity={0.3}>
          <mesh position={pos}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#00f5ff' : '#0066ff'}
              transparent
              opacity={0.9}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function OrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ring1.current) ring1.current.rotation.z += 0.004;
    if (ring2.current) ring2.current.rotation.x += 0.003;
    if (ring3.current) ring3.current.rotation.y += 0.002;
  });

  return (
    <group>
      <Torus ref={ring1} args={[2.4, 0.006, 8, 120]} rotation={[Math.PI / 4, 0, 0]}>
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.25} />
      </Torus>
      <Torus ref={ring2} args={[3.0, 0.004, 8, 120]} rotation={[1.2, 0.5, 0]}>
        <meshBasicMaterial color="#0066ff" transparent opacity={0.15} />
      </Torus>
      <Torus ref={ring3} args={[3.6, 0.003, 8, 120]} rotation={[0.5, 1.0, 0.3]}>
        <meshBasicMaterial color="#00ff88" transparent opacity={0.1} />
      </Torus>
    </group>
  );
}

function DataPackets() {
  const count = 12;
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const phases = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    []
  );

  useFrame((state) => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = state.clock.elapsedTime * 0.5 + phases[i];
      const radius = 2.4;
      const tilt = (i % 3) * 0.6;
      mesh.position.x = Math.cos(t) * radius;
      mesh.position.y = Math.sin(t * 0.7 + tilt) * radius * 0.4;
      mesh.position.z = Math.sin(t) * radius;
    });
  });

  return (
    <group>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <boxGeometry args={[0.06, 0.06, 0.06]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00f5ff' : '#00ff88'}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

function FloatingCubes() {
  const cubeRefs = useRef<(THREE.Mesh | null)[]>([]);
  const cubeData = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        pos: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4 - 2,
        ] as [number, number, number],
        speed: 0.3 + Math.random() * 0.5,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        size: 0.08 + Math.random() * 0.12,
      })),
    []
  );

  useFrame((state) => {
    cubeRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x += cubeData[i].rotSpeed;
      mesh.rotation.y += cubeData[i].rotSpeed * 0.7;
      mesh.position.y = cubeData[i].pos[1] + Math.sin(state.clock.elapsedTime * cubeData[i].speed) * 0.4;
    });
  });

  return (
    <group>
      {cubeData.map((cube, i) => (
        <mesh key={i} ref={(el) => { cubeRefs.current[i] = el; }} position={cube.pos}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#00f5ff' : '#0066ff'}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

export function CyberGlobe() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00f5ff" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#0066ff" />
        <pointLight position={[0, 5, -3]} intensity={0.6} color="#00ff88" />

        <Stars radius={80} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />

        <Globe />
        <NetworkNodes />
        <OrbitRings />
        <DataPackets />
        <FloatingCubes />
      </Canvas>
    </div>
  );
}
