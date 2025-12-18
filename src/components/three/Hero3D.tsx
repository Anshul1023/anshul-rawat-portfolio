// src/components/three/Hero3D.tsx
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SceneContent() {
  const torusRef = useRef<any>(null);
  const orbRef = useRef<any>(null);
  const ringRef = useRef<any>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.y = t * 0.14;
      torusRef.current.rotation.x = Math.sin(t * 0.22) * 0.08;
    }
    if (orbRef.current) {
      orbRef.current.position.y = Math.sin(t * 1.2) * 0.25;
      orbRef.current.rotation.y += 0.01;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.08;
    }
  });

  return (
    <>
      {/* subtle background stars: a simple particle field */}
      <points position={[0, 0, -8]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={400 * 3}
            array={new Float32Array(
              Array.from({ length: 400 }).flatMap(() => [
                (Math.random() - 0.5) * 18,
                (Math.random() - 0.5) * 12,
                -8 - Math.random() * 8,
              ])
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} sizeAttenuation={true} color={"#cfcac2"} opacity={0.8} />
      </points>

      {/* Torus rings */}
      <mesh ref={torusRef} position={[0, 0.1, -4]}>
        <torusGeometry args={[2.4, 0.02, 16, 200]} />
        <meshStandardMaterial color={"#b89b4a"} emissive={"#8f6f32"} metalness={0.9} roughness={0.35} />
      </mesh>

      <mesh ref={ringRef} position={[0, 0, -4]}>
        <torusGeometry args={[1.6, 0.02, 16, 200]} />
        <meshStandardMaterial color={"#b89b4a"} emissive={"#7b5f2a"} metalness={0.9} roughness={0.45} />
      </mesh>

      {/* Floating orb */}
      <mesh ref={orbRef} position={[0.8, 0.6, -3.6]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#e1c87a" emissive="#caa84d" metalness={1} roughness={0.15} />
      </mesh>

      {/* Lights */}
      <ambientLight intensity={0.45} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} />
      <pointLight position={[-6, -4, -2]} intensity={0.25} color={"#ffd87d"} />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 40 }} style={{ width: "100%", height: "100%" }}>
      <color attach="background" args={["#030303"]} />
      <SceneContent />
    </Canvas>
  );
}
