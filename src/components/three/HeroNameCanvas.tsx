import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// -------------------------------------------------------
// 3D NAME MODEL
// -------------------------------------------------------
function NameModel() {
  const gltf = useGLTF("/models/anshul_name.glb");
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    const model = ref.current!;
    const meshes: THREE.Mesh[] = [];

    // Fade-in setup
    model.traverse((child: any) => {
      if (child.isMesh) {
        child.material.transparent = true;
        child.material.opacity = 0;
        meshes.push(child);
      }
    });

    // Initial scale and position
    gsap.set(model.scale, { x: 1.25, y: 1.25, z: 1.25 });
    gsap.set(model.position, { x: 0, y: 0, z: -1.2 });

    // Pop animation
    const tl = gsap.timeline();
    tl.to(model.scale, {
      x: 1.45,
      y: 1.45,
      z: 1.45,
      duration: 1.5,
      ease: "power2.out",
    })
      .to(
        model.position,
        { z: -0.3, duration: 1.5, ease: "power2.out" },
        "<"
      )
      .to(
        meshes.map((m) => m.material),
        { opacity: 1, duration: 1.2, ease: "power2.out" },
        "<"
      );
  }, []);

  // Floating animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      ref.current.position.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  return <primitive ref={ref} object={gltf.scene} />;
}

// -------------------------------------------------------
// CAMERA EFFECT REMOVED
// -------------------------------------------------------
function CameraZoomEffect() {
  return null;
}

// -------------------------------------------------------
// FINAL CANVAS COMPONENT (FIXED & SAFE)
// -------------------------------------------------------
export default function HeroNameCanvas() {
  return (
    <div
      className="
        absolute inset-0 
        -z-10 
        pointer-events-none 
        overflow-hidden       /* ← prevents canvas spill */
      "
    >
      <Canvas
        className="hero-canvas" /* ← important for global fix */
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        dpr={[1, 1.5]}          /* performance-friendly */
      >
        <Suspense fallback={null}>
          <CameraZoomEffect />

          <ambientLight intensity={0.4} />
          <directionalLight intensity={1.2} position={[3, 3, 3]} />

          <NameModel />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/anshul_name.glb");
