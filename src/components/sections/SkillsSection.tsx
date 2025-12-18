// src/components/sections/SkillsSection.tsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero-style pinned skills section.
 * - DO NOT change imports elsewhere.
 * - Replace your current SkillsSection with this file.
 */

const portalSections = [
  { title: "Frontend Universe", subtitle: "Interface Dimension", skills: ["React.js", "TypeScript", "JavaScript","Tailwind CSS"], color: 0x61dafb, particleColor: 0x00d9ff },
  { title: "Backend and API Testing", subtitle: "Logic Dimension", skills: ["Python", "FastAPI", "REST APIs","Postmant"], color: 0x7c3aed, particleColor: 0xc084fc },
  { title: "Database Matrix", subtitle: "Data Dimension", skills: ["PostgreSQL", "MySQL"], color: 0xf59e0b, particleColor: 0xffdd57 },
  { title: "DevOps Gateway", subtitle: "Infrastructure Dimension", skills: ["Docker", "Kubernetes","Redis", "CI/CD"], color: 0x06b6d4, particleColor: 0x2dd4bf },
  { title: "Code Workflow", subtitle: "Version controll", skills: ["Git", "GitHub"], color: 0xf24e1e, particleColor: 0xff6b35 },
  { title: "AI tools", subtitle: "Next-Gen Intelligence", skills: ["ChatGpt","Claude.ai","bolt.ai","Cursor.dev","Copilot","Langchain"], color: 0x22c55e, particleColor: 0x00ff88 }
];

export default function SkillsSection(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // refs used by THREE animation loop
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const portalsRef = useRef<THREE.Group[]>([]);
  const tunnelGeoRef = useRef<THREE.BufferGeometry | null>(null);

  // driveable values
  const progressRef = useRef({ value: 0 }); // 0->1 - driven by GSAP timeline
  const targetZRef = useRef(5);
  const rafRef = useRef<number | null>(null);

  const [currentPortal, setCurrentPortal] = useState(0);
  const [scrollProgressDisplay, setScrollProgressDisplay] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // ---------- THREE INIT ----------
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const portalSpacing = 30;
    const portals: THREE.Group[] = [];

    // create portals (kept same as original)
    portalSections.forEach((section, idx) => {
      const group = new THREE.Group();
      group.position.z = -idx * portalSpacing - 20;

      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(8, 0.6, 16, 100),
        new THREE.MeshStandardMaterial({ color: section.color, emissive: section.color, emissiveIntensity: 0.4, metalness: 0.9, roughness: 0.1 })
      );
      group.add(torus);

      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(7.5, 64),
        new THREE.MeshBasicMaterial({ color: section.color, transparent: true, opacity: 0.2, side: THREE.DoubleSide, blending: THREE.AdditiveBlending })
      );
      group.add(disc);

      const wireframeGeo = new THREE.TorusGeometry(8.3, 0.65, 16, 100);
      const wireEdges = new THREE.EdgesGeometry(wireframeGeo);
      const wire = new THREE.LineSegments(wireEdges, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 }));
      group.add(wire);

      // particles for portal
      const pCount = 300;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const color = new THREE.Color(section.particleColor);

      for (let i = 0; i < pCount; i++) {
        const angle = (i / pCount) * Math.PI * 2;
        const r = 3 + Math.random() * 4;
        pPos[i * 3] = Math.cos(angle) * r;
        pPos[i * 3 + 1] = Math.sin(angle) * r;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 2;

        pCol[i * 3] = color.r;
        pCol[i * 3 + 1] = color.g;
        pCol[i * 3 + 2] = color.b;
      }

      const pg = new THREE.BufferGeometry();
      pg.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pg.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const particles = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending }));
      group.add(particles);

      group.add(new THREE.PointLight(section.color, 2.5, 40));
      scene.add(group);
      portals.push(group);
    });

    portalsRef.current = portals;

    // tunnel particles
    const tunnelCount = 2000;
    const tPos = new Float32Array(tunnelCount * 3);
    const tCol = new Float32Array(tunnelCount * 3);
    for (let i = 0; i < tunnelCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 15 + Math.random() * 20;
      tPos[i * 3] = Math.cos(a) * r;
      tPos[i * 3 + 1] = Math.sin(a) * r;
      tPos[i * 3 + 2] = (Math.random() - 0.5) * 200;
      const b = Math.random();
      tCol[i * 3] = b;
      tCol[i * 3 + 1] = b * 0.8;
      tCol[i * 3 + 2] = 1;
    }
    const tunnelGeo = new THREE.BufferGeometry();
    tunnelGeo.setAttribute("position", new THREE.BufferAttribute(tPos, 3));
    tunnelGeo.setAttribute("color", new THREE.BufferAttribute(tCol, 3));
    tunnelGeoRef.current = tunnelGeo;
    const tunnel = new THREE.Points(tunnelGeo, new THREE.PointsMaterial({ size: 0.15, vertexColors: true, transparent: true, opacity: 0.7 }));
    scene.add(tunnel);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    // resize helper
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    onResize();
    window.addEventListener("resize", onResize);

    // ---------- ANIMATION LOOP ----------
    let prevTime = performance.now();
    const portalSpacingLocal = 30;
    const tick = () => {
      // update portals
      const t = (performance.now() - prevTime) / 1000;
      const time = performance.now() / 1000;

      portalsRef.current.forEach((p, idx) => {
        p.children[0].rotation.z = time * 0.5;
        p.children[1].scale.setScalar(1 + Math.sin(time * 2 + idx) * 0.05);
        if (p.children[2]) (p.children[2] as THREE.Object3D).rotation.z = -time * 0.3;
        // swirl particles rotation if present (child 3)
        const maybeParticles = p.children.find((c) => (c as THREE.Points).geometry !== undefined) as THREE.Points | undefined;
        if (maybeParticles) maybeParticles.rotation.z = time * 0.8 + idx;
      });

      // tunnel moves
      const arr = (tunnelGeoRef.current!.attributes.position.array as Float32Array);
      for (let i = 2; i < arr.length; i += 3) {
        arr[i] += 2;
        if (arr[i] > 100) arr[i] = -100;
      }
      tunnelGeoRef.current!.attributes.position.needsUpdate = true;

      // smoothly move camera.z toward targetZRef
      if (cameraRef.current) {
        cameraRef.current.position.z += (targetZRef.current - cameraRef.current.position.z) * 0.06;
        // subtle camera float
        const tm = performance.now() / 1000;
        cameraRef.current.position.x = Math.sin(tm * 0.12) * 0.05;
        cameraRef.current.position.y = Math.cos(tm * 0.07) * 0.03;
      }

      renderer.render(scene, camera);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // ---------- GSAP TIMELINE (PIN + SCRUB) ----------
    // We'll pin the section and animate progressRef.value from 0 -> 1
    const container = containerRef.current!;
    const totalTravel = Math.max(1200, window.innerHeight * 1.8) + container.clientHeight; // arbitrary but big enough
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${container.clientHeight + window.innerHeight * 0.8}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1
      }
    });

    // Animate the progressRef value (0 -> 1). OnUpdate will set targetZRef & state.
    tl.to(progressRef.current, {
      value: 1,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        const p = progressRef.current.value;
        // set targetZ based on p
        targetZRef.current = 5 - p * ((portalSections.length - 1) * portalSpacingLocal);
        // set visible portal index (clamp)
        const idx = Math.floor(p * portalSections.length);
        const clamped = Math.min(Math.max(idx, 0), portalSections.length - 1);
        setCurrentPortal(clamped);
        // update small displayed progress (for UI)
        setScrollProgressDisplay(parseFloat((p).toFixed(3)));
      }
    });

    // ensure progress resets when leaving (optional safety)
    ScrollTrigger.addEventListener("refreshInit", () => {
      // make sure pin calculations are correct on resize
    });

    // cleanup on unmount
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      tl.kill();
      ScrollTrigger.getAll().forEach(s => s.kill());
      renderer.dispose();
      // dispose geometries / materials (light cleanup)
      scene.traverse((it) => {
        // @ts-ignore
        if (it.geometry) it.geometry.dispose();
        // @ts-ignore
        if (it.material) {
          // material can be array
          const mat = it.material as any;
          if (Array.isArray(mat)) mat.forEach((m) => m.dispose && m.dispose());
          else mat.dispose && mat.dispose();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = portalSections[Math.min(Math.max(currentPortal, 0), portalSections.length - 1)];

  // ---------- JSX ----------
  return (
    <section id="skills" ref={containerRef} className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Canvas contained inside section — will be pinned by ScrollTrigger */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* subtle vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none" style={{ background: "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.75))" }} />

      {/* Center content (same as your design) */}
      <div className="relative z-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-4xl px-6">
          <div className="mb-6">
            <span className="px-5 py-2 rounded-full text-xs font-mono tracking-widest border" style={{ borderColor: `#${active.color.toString(16).padStart(6, "0")}`, background: "#ffffff10" }}>
              PORTAL {currentPortal + 1} / {portalSections.length}
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black mb-3 tracking-tight" style={{ color: `#${active.color.toString(16).padStart(6, "0")}`, textShadow: `0 0 50px #${active.color.toString(16).padStart(6, "0")}` }}>
            {active.title}
          </h1>

          <p className="text-2xl text-gray-300 mb-10">{active.subtitle}</p>

          <div className="flex flex-wrap justify-center gap-4">
            {active.skills.map((s, i) => (
              <div key={i} className="px-6 py-3 rounded-xl border backdrop-blur-xl hover:scale-110 transition-all" style={{ borderColor: "#ffffff30", background: "#ffffff05" }}>
                <span className="text-white font-medium">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* sticky-like progress bar at bottom (center) to match previous look */}
      <div className="sticky bottom-10 w-full flex justify-center z-30 pointer-events-none">
        <div className="w-96">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full transition-all duration-300" style={{ width: `${scrollProgressDisplay * 100}%`, background: `linear-gradient(90deg, ${portalSections.map(p => `#${p.color.toString(16).padStart(6,"0")}`).join(", ")})` }} />
          </div>
          <p className="text-center text-xs text-gray-500 mt-2 font-mono">TRAVELING THROUGH DIMENSIONS</p>
        </div>
      </div>
    </section>
  );
}
