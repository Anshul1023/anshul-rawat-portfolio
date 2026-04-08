import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const portalSections = [
  {
    title: "Frontend Universe",
    subtitle: "Interface Dimension",
    skills: ["React.js", "TypeScript", "JavaScript", "Tailwind CSS"],
    color: 0x61dafb,
    particleColor: 0x00d9ff,
  },
  {
    title: "Backend and API Testing",
    subtitle: "Logic Dimension",
    skills: ["Python", "FastAPI", "REST APIs", "Postman"],
    color: 0x7c3aed,
    particleColor: 0xc084fc,
  },
  {
    title: "Database Matrix",
    subtitle: "Data Dimension",
    skills: ["PostgreSQL", "MySQL"],
    color: 0xf59e0b,
    particleColor: 0xffdd57,
  },
  {
    title: "DevOps Gateway",
    subtitle: "Infrastructure Dimension",
    skills: ["Docker", "Kubernetes", "Redis", "CI/CD"],
    color: 0x06b6d4,
    particleColor: 0x2dd4bf,
  },
  {
    title: "Code Workflow",
    subtitle: "Version Control",
    skills: ["Git", "GitHub"],
    color: 0xf24e1e,
    particleColor: 0xff6b35,
  },
  {
    title: "AI Tools",
    subtitle: "Next-Gen Intelligence",
    skills: ["ChatGPT", "Claude", "Bolt", "Cursor", "Copilot", "LangChain"],
    color: 0x22c55e,
    particleColor: 0x00ff88,
  },
];

export default function SkillsSection(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const portalsRef = useRef<THREE.Group[]>([]);
  const tunnelGeoRef = useRef<THREE.BufferGeometry | null>(null);
  const progressRef = useRef({ value: 0 });
  const targetZRef = useRef(5);
  const rafRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const isPageVisibleRef = useRef(true);

  const [currentPortal, setCurrentPortal] = useState(0);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const disposeMaterial = (
      material: THREE.Material | THREE.Material[] | undefined
    ) => {
      if (!material) return;

      if (Array.isArray(material)) {
        material.forEach((entry) => entry.dispose());
        return;
      }

      material.dispose();
    };

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const portalSpacing = 28;
    const portals: THREE.Group[] = [];

    portalSections.forEach((section, idx) => {
      const group = new THREE.Group();
      group.position.z = -idx * portalSpacing - 20;

      const torus = new THREE.Mesh(
        new THREE.TorusGeometry(8, 0.6, 16, 100),
        new THREE.MeshStandardMaterial({
          color: section.color,
          emissive: section.color,
          emissiveIntensity: 0.4,
          metalness: 0.9,
          roughness: 0.1,
        })
      );
      group.add(torus);

      const disc = new THREE.Mesh(
        new THREE.CircleGeometry(7.5, 64),
        new THREE.MeshBasicMaterial({
          color: section.color,
          transparent: true,
          opacity: 0.2,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        })
      );
      group.add(disc);

      const wireframeGeo = new THREE.TorusGeometry(8.3, 0.65, 16, 100);
      const wireEdges = new THREE.EdgesGeometry(wireframeGeo);
      const wire = new THREE.LineSegments(
        wireEdges,
        new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.25,
        })
      );
      group.add(wire);

      const pCount = 220;
      const pPos = new Float32Array(pCount * 3);
      const pCol = new Float32Array(pCount * 3);
      const color = new THREE.Color(section.particleColor);

      for (let i = 0; i < pCount; i++) {
        const angle = (i / pCount) * Math.PI * 2;
        const radius = 3 + Math.random() * 4;
        pPos[i * 3] = Math.cos(angle) * radius;
        pPos[i * 3 + 1] = Math.sin(angle) * radius;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 2;

        pCol[i * 3] = color.r;
        pCol[i * 3 + 1] = color.g;
        pCol[i * 3 + 2] = color.b;
      }

      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      particleGeometry.setAttribute("color", new THREE.BufferAttribute(pCol, 3));

      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          size: 0.15,
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          blending: THREE.AdditiveBlending,
        })
      );
      group.add(particles);

      group.add(new THREE.PointLight(section.color, 2.5, 40));
      scene.add(group);
      portals.push(group);
    });

    portalsRef.current = portals;

    const tunnelCount = 1200;
    const tunnelPosition = new Float32Array(tunnelCount * 3);
    const tunnelColor = new Float32Array(tunnelCount * 3);

    for (let i = 0; i < tunnelCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 15 + Math.random() * 20;
      tunnelPosition[i * 3] = Math.cos(angle) * radius;
      tunnelPosition[i * 3 + 1] = Math.sin(angle) * radius;
      tunnelPosition[i * 3 + 2] = (Math.random() - 0.5) * 200;
      const brightness = Math.random();
      tunnelColor[i * 3] = brightness;
      tunnelColor[i * 3 + 1] = brightness * 0.8;
      tunnelColor[i * 3 + 2] = 1;
    }

    const tunnelGeometry = new THREE.BufferGeometry();
    tunnelGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(tunnelPosition, 3)
    );
    tunnelGeometry.setAttribute("color", new THREE.BufferAttribute(tunnelColor, 3));
    tunnelGeoRef.current = tunnelGeometry;

    const tunnel = new THREE.Points(
      tunnelGeometry,
      new THREE.PointsMaterial({
        size: 0.15,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
      })
    );
    scene.add(tunnel);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    onResize();
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (!isAnimatingRef.current || !isPageVisibleRef.current) {
        rafRef.current = null;
        return;
      }

      const time = performance.now() / 1000;

      portalsRef.current.forEach((portal, idx) => {
        portal.children[0].rotation.z = time * 0.5;
        portal.children[1].scale.setScalar(1 + Math.sin(time * 2 + idx) * 0.05);

        const wireframe = portal.children[2];
        if (wireframe) {
          wireframe.rotation.z = -time * 0.3;
        }

        const particles = portal.children.find(
          (child) => child instanceof THREE.Points
        );

        if (particles) {
          particles.rotation.z = time * 0.8 + idx;
        }
      });

      const tunnelPositions = tunnelGeoRef.current?.attributes.position
        .array as Float32Array | undefined;

      if (tunnelPositions && tunnelGeoRef.current) {
        for (let i = 2; i < tunnelPositions.length; i += 3) {
          tunnelPositions[i] += 1.35;
          if (tunnelPositions[i] > 100) tunnelPositions[i] = -100;
        }

        tunnelGeoRef.current.attributes.position.needsUpdate = true;
      }

      if (cameraRef.current) {
        cameraRef.current.position.z +=
          (targetZRef.current - cameraRef.current.position.z) * 0.06;
        cameraRef.current.position.x = Math.sin(time * 0.12) * 0.05;
        cameraRef.current.position.y = Math.cos(time * 0.07) * 0.03;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const stopAnimation = () => {
      isAnimatingRef.current = false;

      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const handleVisibilityChange = () => {
      isPageVisibleRef.current = !document.hidden;

      if (document.hidden) {
        stopAnimation();
      } else if (ScrollTrigger.isInViewport(containerRef.current!)) {
        startAnimation();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const sectionActivity = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: startAnimation,
      onEnterBack: startAnimation,
      onLeave: stopAnimation,
      onLeaveBack: stopAnimation,
    });

    const portalSpacingLocal = portalSpacing;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () =>
          `+=${containerRef.current!.clientHeight + window.innerHeight * 0.8}`,
        scrub: 0.6,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to(progressRef.current, {
      value: 1,
      ease: "none",
      duration: 1,
      onUpdate: () => {
        const progress = progressRef.current.value;
        targetZRef.current =
          5 - progress * ((portalSections.length - 1) * portalSpacingLocal);
        const idx = Math.floor(progress * portalSections.length);
        const clamped = Math.min(Math.max(idx, 0), portalSections.length - 1);
        setCurrentPortal((prev) => (prev === clamped ? prev : clamped));

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${progress * 100}%`;
        }
      },
    });

    handleVisibilityChange();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("resize", onResize);
      sectionActivity.kill();
      tl.kill();
      stopAnimation();

      scene.traverse((item) => {
        if (
          item instanceof THREE.Mesh ||
          item instanceof THREE.Points ||
          item instanceof THREE.LineSegments
        ) {
          item.geometry.dispose();
          disposeMaterial(item.material);
        }
      });

      renderer.dispose();
    };
  }, []);

  const active =
    portalSections[Math.min(Math.max(currentPortal, 0), portalSections.length - 1)];

  return (
    <section
      id="skills"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black text-white"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(circle, transparent 30%, rgba(0,0,0,0.75))",
        }}
      />

      <div className="relative z-20 flex min-h-screen items-center justify-center">
        <div className="max-w-4xl px-6 text-center">
          <div className="mb-6">
            <span
              className="rounded-full border px-5 py-2 text-xs font-mono tracking-widest"
              style={{
                borderColor: `#${active.color.toString(16).padStart(6, "0")}`,
                background: "#ffffff10",
              }}
            >
              PORTAL {currentPortal + 1} / {portalSections.length}
            </span>
          </div>

          <h1
            className="mb-3 text-6xl font-black tracking-tight md:text-8xl"
            style={{
              color: `#${active.color.toString(16).padStart(6, "0")}`,
              textShadow: `0 0 50px #${active.color.toString(16).padStart(6, "0")}`,
            }}
          >
            {active.title}
          </h1>

          <p className="mb-10 text-2xl text-gray-300">{active.subtitle}</p>

          <div className="flex flex-wrap justify-center gap-4">
            {active.skills.map((skill) => (
              <div
                key={skill}
                className="rounded-xl border px-6 py-3 backdrop-blur-xl transition-all hover:scale-110"
                style={{
                  borderColor: "#ffffff30",
                  background: "#ffffff05",
                }}
              >
                <span className="font-medium text-white">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none sticky bottom-10 z-30 flex w-full justify-center">
        <div className="w-96">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressBarRef}
              className="h-full transition-all duration-300"
              style={{
                width: "0%",
                background: `linear-gradient(90deg, ${portalSections
                  .map((section) => `#${section.color.toString(16).padStart(6, "0")}`)
                  .join(", ")})`,
              }}
            />
          </div>
          <p className="mt-2 text-center font-mono text-xs text-gray-500">
            TRAVELING THROUGH DIMENSIONS
          </p>
        </div>
      </div>
    </section>
  );
}
