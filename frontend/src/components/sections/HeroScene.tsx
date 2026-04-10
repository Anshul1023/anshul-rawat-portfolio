import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#020202", 10, 24);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.2, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setClearColor("#020202", 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#ffffff", 0.55);
    const keyLight = new THREE.DirectionalLight("#e5e7eb", 1.15);
    keyLight.position.set(3.5, 3, 5);
    const rimLight = new THREE.DirectionalLight("#a3e635", 0.7);
    rimLight.position.set(-5, 2, 4);
    scene.add(ambientLight, keyLight, rimLight);

    const particleCount = 900;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const stride = index * 3;
      particlePositions[stride] = THREE.MathUtils.randFloatSpread(24);
      particlePositions[stride + 1] = THREE.MathUtils.randFloatSpread(14);
      particlePositions[stride + 2] = THREE.MathUtils.randFloatSpread(14);
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({
        color: "#d4d4d8",
        size: 0.032,
        transparent: true,
        opacity: 0.26,
        depthWrite: false
      })
    );
    scene.add(particles);

    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: "#0d0d0d",
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.72,
      clearcoatRoughness: 0.18,
      reflectivity: 1
    });
    const accentSphereMaterial = new THREE.MeshPhysicalMaterial({
      color: "#18181b",
      emissive: "#a3e635",
      emissiveIntensity: 0.08,
      metalness: 0.82,
      roughness: 0.26,
      clearcoat: 0.66
    });
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#3f3f46",
      transparent: true,
      opacity: 0.34,
      wireframe: true
    });

    const meshes = [
      new THREE.Mesh(new THREE.SphereGeometry(1.55, 48, 48), accentSphereMaterial),
      new THREE.Mesh(new THREE.SphereGeometry(1.2, 48, 48), sphereMaterial),
      new THREE.Mesh(new THREE.TorusGeometry(2.2, 0.022, 12, 160), ringMaterial),
      new THREE.Mesh(new THREE.TorusGeometry(1.45, 0.018, 12, 120), ringMaterial)
    ];

    meshes[0].position.set(-4.8, 1.3, -0.5);
    meshes[1].position.set(4.6, -1.4, -0.2);
    meshes[2].position.set(0, 0.35, -4.6);
    meshes[2].rotation.x = Math.PI / 2.7;
    meshes[3].position.set(5.8, 2.6, -3.8);
    meshes[3].rotation.y = Math.PI / 3;
    meshes.forEach((mesh) => scene.add(mesh));

    const resize = () => {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const tick = () => {
      frameId = window.requestAnimationFrame(tick);
      const elapsed = clock.getElapsedTime();

      particles.rotation.y += 0.00035;
      particles.rotation.x += 0.00008;

      meshes[0].rotation.y += 0.0022;
      meshes[0].rotation.x += 0.0015;
      meshes[0].position.y = 1.3 + Math.sin(elapsed * 0.75) * 0.14;

      meshes[1].rotation.y -= 0.0017;
      meshes[1].rotation.x += 0.0012;
      meshes[1].position.y = -1.4 + Math.cos(elapsed * 0.7) * 0.12;

      meshes[2].rotation.z += 0.0011;
      meshes[3].rotation.x += 0.0012;
      meshes[3].rotation.z -= 0.001;

      camera.position.x = Math.sin(elapsed * 0.12) * 0.12;
      camera.position.y = 0.2 + Math.cos(elapsed * 0.14) * 0.08;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    tick();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      container.removeChild(renderer.domElement);
      particlesGeometry.dispose();
      (particles.material as { dispose: () => void }).dispose();
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as { dispose: () => void }).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="h-full w-full" aria-hidden="true" />;
}
