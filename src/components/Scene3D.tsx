import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface CosmicSceneProps {
  currentSection: string;
}

// Floating Icosahedron with glow
function FloatingCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
    if (glowRef.current) {
      glowRef.current.rotation.x = -state.clock.elapsedTime * 0.1;
      glowRef.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group position={[3, 0, -2]}>
        {/* Core geometry */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#00f5ff"
            emissive="#00f5ff"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
            wireframe
          />
        </mesh>
        {/* Outer glow ring */}
        <mesh ref={glowRef} scale={1.3}>
          <torusGeometry args={[1, 0.02, 16, 100]} />
          <meshBasicMaterial color="#bf00ff" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

// Nebula effect with particles
function Nebula() {
  const count = 500;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 12;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // Gradient colors
      const t = Math.random();
      if (t < 0.33) {
        colors[i * 3] = 0;
        colors[i * 3 + 1] = 0.96;
        colors[i * 3 + 2] = 1;
      } else if (t < 0.66) {
        colors[i * 3] = 0.75;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3] = 1;
        colors[i * 3 + 1] = 0;
        colors[i * 3 + 2] = 0.43;
      }

      sizes[i] = Math.random() * 0.1;
    }

    return { positions, colors, sizes };
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Orbiting rings
function OrbitRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.3;
      ring1Ref.current.rotation.z = t * 0.1;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = t * 0.2;
      ring2Ref.current.rotation.x = t * 0.15;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.z = t * 0.25;
      ring3Ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <group position={[-3, 1, -3]}>
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.5, 0.01, 16, 100]} />
        <meshBasicMaterial color="#bf00ff" transparent opacity={0.3} />
      </mesh>
      <mesh ref={ring3Ref}>
        <torusGeometry args={[3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#ff006e" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Floating DNA-like helix
function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  const helixPoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 50; i++) {
      const t = i * 0.3;
      points.push(new THREE.Vector3(
        Math.sin(t) * 0.5,
        t * 0.2 - 2.5,
        Math.cos(t) * 0.5
      ));
    }
    return points;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[-5, 0, -1]}>
      {helixPoints.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00f5ff" : "#bf00ff"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function CosmicScene({ currentSection }: CosmicSceneProps) {
  const sectionColors: Record<string, string> = {
    hero: "#00f5ff",
    about: "#bf00ff",
    experience: "#ff006e",
    skills: "#00ff88",
    contact: "#3b82f6",
  };

  const accentColor = sectionColors[currentSection] || "#00f5ff";

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color={accentColor} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#bf00ff" />

      {/* Star field */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Sparkles */}
      <Sparkles
        count={100}
        scale={20}
        size={2}
        speed={0.4}
        color="#00f5ff"
        opacity={0.3}
      />

      {/* Nebula particles */}
      <Nebula />

      {/* Floating core geometry */}
      <FloatingCore />

      {/* Orbit rings */}
      <OrbitRings />

      {/* DNA Helix */}
      <DNAHelix />

      {/* Additional floating spheres */}
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[4, 2, -5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#ff006e"
            emissive="#ff006e"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[-4, -2, -4]}>
          <octahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}
