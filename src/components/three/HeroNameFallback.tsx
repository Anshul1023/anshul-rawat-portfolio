// src/components/three/HeroNameFallback.tsx
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function FallbackName() {
  const grp = useRef<any>(null);
  const lightRef = useRef<any>(null);

  useFrame((state, delta) => {
    if (grp.current) {
      grp.current.rotation.y += delta * 0.04;
      grp.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.02;
    }
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.16) * 1.5;
    }
  });

  useEffect(() => {
    if (!grp.current) return;
    gsap.fromTo(grp.current.position, { z: -5, y: -0.4 }, { z: -3, y: 0, duration: 1.6, ease: "power3.out" });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: 1 },
    });
    tl.to(grp.current.position, { z: -1.2, y: 1.0, x: 0.6, ease: "power2.out" });
    tl.to(grp.current.rotation, { x: "+=0.8", y: "+=1.0" }, 0);
    return () => { tl.kill(); ScrollTrigger.getAll().forEach(s => s.kill()); };
  }, []);

  return (
    <group ref={grp}>
      {/* outer bright gold slightly larger */}
      <Text font="/fonts/Exo2-Regular.ttf" fontSize={0.45} position={[0, 0, 0.01]} anchorX="center" anchorY="middle">
        Anshul Rawat
        <meshStandardMaterial attach="material" color={"#E5C77A"} metalness={0.9} roughness={0.12} />
      </Text>

      {/* inner darker core scaled a little */}
      <Text font="/fonts/Exo2-Regular.ttf" fontSize={0.45} position={[0, 0, 0]} anchorX="center" anchorY="middle">
        Anshul Rawat
        <meshStandardMaterial attach="material" color={"#5A4324"} metalness={0.7} roughness={0.28} />
      </Text>

      <pointLight ref={lightRef as any} position={[2, 2, 2.5]} intensity={1.2} color={"#f4e7c2"} />
    </group>
  );
}

export default function HeroNameFallbackCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="absolute inset-0 pointer-events-none -z-20">
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.9} />
      <FallbackName />
    </Canvas>
  );
}
