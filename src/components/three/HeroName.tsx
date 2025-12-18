// src/components/three/HeroName.tsx
import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Text } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function NameModelInner() {
  const group = useRef<any>(null);
  const lightRef = useRef<any>(null);

  // Try to load the GLB model (must be placed at public/models/anshul_name.glb)
  // useGLTF works with Suspense - fallback will show if model isn't ready.
  const gltf = useGLTF("/models/anshul_name.glb", true);

  // Apply subtle material adjustments (if model meshes exist)
  useEffect(() => {
    if (!gltf || !gltf.scene) return;
    gltf.scene.traverse((child: any) => {
      if (child.isMesh) {
        // safer defaults for premium dark look
        if (child.material) {
          child.material.metalness = typeof child.material.metalness === "number" ? child.material.metalness : 0.8;
          child.material.roughness = typeof child.material.roughness === "number" ? child.material.roughness : 0.18;
          // optional color fallback
          try {
            child.material.color.set("#c9a86a");
          } catch (e) {
            // ignore if material doesn't support color set
          }
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });
  }, [gltf]);

  // idle motion
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.06;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.07) * 0.03;
    }
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.18) * 1.6;
      lightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.12) * 0.6 + 1.2;
    }
  });

  useEffect(() => {
    if (!group.current) return;

    // entry animation
    gsap.fromTo(
      group.current.position,
      { z: -6, y: -0.6, x: 0 },
      { z: -3.2, y: 0, duration: 1.6, ease: "power3.out" }
    );

    // scroll-driven timeline (depth push + rotation + light sweep)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.to(group.current.position, {
      z: -1.2,
      y: 0.9,
      x: 0.8,
      ease: "power2.out",
    });

    tl.to(
      group.current.rotation,
      {
        x: "+=0.9",
        y: "+=1.2",
      },
      0
    );

    tl.to(
      lightRef.current,
      { intensity: 2.2, duration: 0.6, ease: "sine.inOut", yoyo: true, repeat: 1 },
      0.1
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  // If GLTF loaded, render it
  if (gltf && gltf.scene) {
    return (
      <group ref={group} dispose={null} scale={[1.15, 1.15, 1.15]}>
        <primitive object={gltf.scene} />
        <pointLight ref={lightRef as any} position={[2, 2, 3]} intensity={1.15} color={"#f4e7c2"} />
      </group>
    );
  }

  // Fallback: 3D Text (drei)
  return (
    <group ref={group} scale={[1.6, 1.6, 1.6]}>
      <Text
        font="/fonts/PlayfairDisplay-Variable.woff"
        fontSize={0.5}
        position={[0, 0, 0]}
        anchorX="center"
        anchorY="middle"
      >
        Anshul Rawat
        <meshStandardMaterial metalness={0.85} roughness={0.18} color={"#c9a86a"} />
      </Text>

      <pointLight ref={lightRef as any} position={[2, 2, 3]} intensity={1.0} color={"#f4e7c2"} />
    </group>
  );
}

export default function HeroNameCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      shadows={true}
      className="absolute inset-0 pointer-events-none -z-20"
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.38} />
      <directionalLight position={[5, 6, 4]} intensity={0.8} />
      <Suspense fallback={null}>
        <NameModelInner />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
