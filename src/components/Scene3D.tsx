import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { Scene3DProps, FloatingGeometryProps } from '../types';

const FloatingGeometry: React.FC<FloatingGeometryProps> = ({ 
  position, 
  geometry, 
  color, 
  rotationSpeed = 1 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state: any) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * rotationSpeed * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed * 0.3;
    }
  });

  const GeometryComponent = geometry;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <GeometryComponent args={geometry === Sphere ? [0.3] : geometry === Box ? [0.5, 0.5, 0.5] : geometry === Torus ? [0.3, 0.1, 8, 16] : [0.4]}>
          <meshStandardMaterial 
            color={color} 
            transparent 
            opacity={0.7}
            roughness={0.3}
            metalness={0.8}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </GeometryComponent>
      </mesh>
    </Float>
  );
};

const Scene3D: React.FC<Scene3DProps> = ({ currentSection }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Memoized geometries for better performance
  const geometries = useMemo(() => [
    { component: Sphere, position: [-3, 2, -2] as [number, number, number], color: "#0ea5e9", speed: 0.8 },
    { component: Box, position: [3, -1, -1] as [number, number, number], color: "#38bdf8", speed: 1.2 },
    { component: Octahedron, position: [-2, -2, -3] as [number, number, number], color: "#0284c7", speed: 0.6 },
    { component: Torus, position: [2, 1, -2] as [number, number, number], color: "#7dd3fc", speed: 1.0 },
    { component: Sphere, position: [0, 3, -4] as [number, number, number], color: "#bae6fd", speed: 0.9 },
    { component: Box, position: [-1, -3, -1] as [number, number, number], color: "#0369a1", speed: 1.1 },
  ], []);

  useFrame((state: any) => {
    if (groupRef.current) {
      // Subtle group rotation based on scroll
      const sections = ['hero', 'about', 'experience', 'skills', 'contact'];
      const sectionIndex = sections.indexOf(currentSection || 'hero');
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        sectionIndex * 0.1,
        0.05
      );
      
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      
      {/* Accent lights */}
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#0ea5e9" />
      <pointLight position={[5, -5, 5]} intensity={0.3} color="#38bdf8" />

      {/* Floating geometries */}
      <group ref={groupRef}>
        {geometries.map((geo, index) => (
          <FloatingGeometry
            key={index}
            position={geo.position}
            geometry={geo.component}
            color={geo.color}
            rotationSpeed={geo.speed}
          />
        ))}
      </group>

      {/* Fog for depth */}
      <fog attach="fog" args={['#0f172a', 8, 15]} />
    </>
  );
};

export default Scene3D;
