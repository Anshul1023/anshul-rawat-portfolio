// @ts-nocheck
import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from "ogl";
import { useEffect, useRef } from "react";

import "./CircularGallery.css";

function debounce(func, wait) {
  let timeout;
  return function debounced(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

function autoBind(instance) {
  const proto = Object.getPrototypeOf(instance);
  Object.getOwnPropertyNames(proto).forEach((key) => {
    if (key !== "constructor" && typeof instance[key] === "function") {
      instance[key] = instance[key].bind(instance);
    }
  });
}

function createTextTexture(gl, text, font = "bold 30px monospace", color = "black") {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const textHeight = Math.ceil(parseInt(font, 10) * 1.2);
  canvas.width = textWidth + 48;
  canvas.height = textHeight + 28;
  context.font = font;
  context.fillStyle = "rgba(0,0,0,0.62)";
  const radius = 18;
  const width = canvas.width;
  const height = canvas.height;
  context.beginPath();
  context.moveTo(radius, 0);
  context.lineTo(width - radius, 0);
  context.quadraticCurveTo(width, 0, width, radius);
  context.lineTo(width, height - radius);
  context.quadraticCurveTo(width, height, width - radius, height);
  context.lineTo(radius, height);
  context.quadraticCurveTo(0, height, 0, height - radius);
  context.lineTo(0, radius);
  context.quadraticCurveTo(0, 0, radius, 0);
  context.closePath();
  context.fill();
  context.fillStyle = color;
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();
  context.moveTo(radius, 0);
  context.lineTo(width - radius, 0);
  context.quadraticCurveTo(width, 0, width, radius);
  context.lineTo(width, height - radius);
  context.quadraticCurveTo(width, height, width - radius, height);
  context.lineTo(radius, height);
  context.quadraticCurveTo(0, height, 0, height - radius);
  context.lineTo(0, radius);
  context.quadraticCurveTo(0, 0, radius, 0);
  context.closePath();
  context.fillStyle = "rgba(0,0,0,0.62)";
  context.fill();
  context.fillStyle = color;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width: canvas.width, height: canvas.height };
}

class Title {
  constructor({ gl, plane, text, textColor = "#ffffff", font = "bold 30px sans-serif" }) {
    autoBind(this);
    this.gl = gl;
    this.plane = plane;
    this.text = text;
    this.textColor = textColor;
    this.font = font;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createTextTexture(this.gl, this.text, this.font, this.textColor);
    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });
    this.mesh = new Mesh(this.gl, { geometry, program });
    const aspect = width / height;
    const textHeight = this.plane.scale.y * 0.095;
    const textWidth = textHeight * aspect;
    this.mesh.scale.set(textWidth, textHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.38;
    this.mesh.position.z = 0.02;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({
    geometry,
    gl,
    image,
    index,
    length,
    scene,
    screen,
    text,
    viewport,
    bend,
    textColor,
    borderRadius = 0,
    font
  }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.index = index;
    this.length = length;
    this.scene = scene;
    this.screen = screen;
    this.text = text;
    this.viewport = viewport;
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.createShader();
    this.createMesh();
    this.createTitle();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, {
      generateMipmaps: true
    });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.08 + uSpeed * 0.45);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        varying vec2 vUv;

        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }

        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );
          vec4 color = texture2D(tMap, uv);
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          gl_FragColor = vec4(color.rgb, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  createTitle() {
    this.title = new Title({
      gl: this.gl,
      plane: this.plane,
      text: this.text,
      textColor: this.textColor,
      font: this.font
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;

    const x = this.plane.position.x;
    const halfViewport = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const bendAbs = Math.abs(this.bend);
      const radius = (halfViewport * halfViewport + bendAbs * bendAbs) / (2 * bendAbs);
      const effectiveX = Math.min(Math.abs(x), halfViewport);

      const arc = radius - Math.sqrt(radius * radius - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / radius);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / radius);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;

    if (direction === "right" && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }

    if (direction === "left" && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) {
      this.screen = screen;
    }

    if (viewport) {
      this.viewport = viewport;
    }

    this.scale = this.screen.height / 1500;
    this.plane.scale.y = (this.viewport.height * (900 * this.scale)) / this.screen.height;
    this.plane.scale.x = (this.viewport.width * (700 * this.scale)) / this.screen.width;
    this.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    this.padding = 2;
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class GalleryApp {
  constructor(
    container,
    {
      items,
      bend,
      textColor = "#ffffff",
      borderRadius = 0,
      font = "bold 30px Figtree, sans-serif",
      scrollSpeed = 2,
      scrollEase = 0.05,
      onActiveIndexChange,
      onItemClick
    } = {}
  ) {
    document.documentElement.classList.remove("no-js");
    this.container = container;
    this.itemCount = items?.length ?? 0;
    this.scrollSpeed = scrollSpeed;
    this.scroll = { ease: scrollEase, current: 0, target: 0, last: 0 };
    this.onActiveIndexChange = onActiveIndexChange;
    this.onItemClick = onItemClick;
    this.activeIndex = 0;
    this.onCheckDebounce = debounce(this.onCheck, 200);
    autoBind(this);
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, textColor, borderRadius, font);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({
      alpha: true,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2)
    });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 20;
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, {
      heightSegments: 50,
      widthSegments: 100
    });
  }

  createMedias(items, bend = 1, textColor, borderRadius, font) {
    const galleryItems = items && items.length ? items : [];
    this.mediasImages = galleryItems.concat(galleryItems, galleryItems);
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        index,
        length: this.mediasImages.length,
        scene: this.scene,
        screen: this.screen,
        text: data.text,
        viewport: this.viewport,
        bend,
        textColor,
        borderRadius,
        font
      });
    });

    if (this.medias.length && this.itemCount) {
      const singleSetWidth = this.medias[0].width * this.itemCount;
      this.scroll.current = singleSetWidth;
      this.scroll.target = singleSetWidth;
      this.scroll.last = singleSetWidth;
      this.activeIndex = 0;
    }
  }

  getNormalizedIndex(index) {
    if (!this.itemCount) {
      return 0;
    }
    return ((index % this.itemCount) + this.itemCount) % this.itemCount;
  }

  getScreenMetrics(media) {
    const x = this.screen.width / 2 + (media.plane.position.x / this.viewport.width) * this.screen.width;
    const y = this.screen.height / 2 - (media.plane.position.y / this.viewport.height) * this.screen.height;
    const width = (media.plane.scale.x / this.viewport.width) * this.screen.width;
    const height = (media.plane.scale.y / this.viewport.height) * this.screen.height;
    return { x, y, width, height };
  }

  emitActiveItem() {
    if (!this.medias?.length || !this.onActiveIndexChange) {
      return;
    }

    let closestMedia = this.medias[0];
    let closestDistance = Infinity;

    this.medias.forEach((media) => {
      const distance = Math.abs(media.plane.position.x);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestMedia = media;
      }
    });

    const nextIndex = this.getNormalizedIndex(closestMedia.index);
    if (nextIndex !== this.activeIndex) {
      this.activeIndex = nextIndex;
      this.onActiveIndexChange(nextIndex);
    }
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) {
      return;
    }
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * (this.scrollSpeed * 0.025);
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
    this.onCheck();
  }

  onWheel(e) {
    if (!this.container.contains(e.target)) {
      return;
    }
    const delta = e.deltaY || e.wheelDelta || e.detail;
    this.scroll.target += (delta > 0 ? this.scrollSpeed : -this.scrollSpeed) * 0.2;
    this.onCheckDebounce();
  }

  onClick(e) {
    if (!this.onItemClick || !this.medias?.length) {
      return;
    }

    const rect = this.container.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const hitMedia = this.medias.find((media) => {
      const metrics = this.getScreenMetrics(media);
      return (
        clickX >= metrics.x - metrics.width / 2 &&
        clickX <= metrics.x + metrics.width / 2 &&
        clickY >= metrics.y - metrics.height / 2 &&
        clickY <= metrics.y + metrics.height / 2
      );
    });

    if (hitMedia) {
      this.onItemClick(this.getNormalizedIndex(hitMedia.index));
      return;
    }

    this.onItemClick(this.activeIndex);
  }

  onCheck() {
    if (!this.medias || !this.medias[0]) {
      return;
    }
    const width = this.medias[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({
      aspect: this.screen.width / this.screen.height
    });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach((media) => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";
    if (this.medias) {
      this.medias.forEach((media) => media.update(this.scroll, direction));
    }
    this.emitActiveItem();
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update);
  }

  addEventListeners() {
    window.addEventListener("resize", this.onResize);
    this.container.addEventListener("wheel", this.onWheel, { passive: true });
    this.container.addEventListener("mousedown", this.onTouchDown);
    window.addEventListener("mousemove", this.onTouchMove);
    window.addEventListener("mouseup", this.onTouchUp);
    this.container.addEventListener("touchstart", this.onTouchDown, { passive: true });
    window.addEventListener("touchmove", this.onTouchMove, { passive: true });
    window.addEventListener("touchend", this.onTouchUp);
    this.container.addEventListener("click", this.onClick);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    this.container.removeEventListener("wheel", this.onWheel);
    this.container.removeEventListener("mousedown", this.onTouchDown);
    window.removeEventListener("mousemove", this.onTouchMove);
    window.removeEventListener("mouseup", this.onTouchUp);
    this.container.removeEventListener("touchstart", this.onTouchDown);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchUp);
    this.container.removeEventListener("click", this.onClick);
    if (this.renderer?.gl?.canvas?.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

type CircularGalleryItem = {
  image: string;
  text: string;
};

type CircularGalleryProps = {
  items: CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
  scrollSpeed?: number;
  scrollEase?: number;
  onActiveIndexChange?: (index: number) => void;
  onItemClick?: (index: number) => void;
};

export default function CircularGallery({
  items,
  bend = 1,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px Figtree, sans-serif",
  scrollSpeed = 2,
  scrollEase = 0.05,
  onActiveIndexChange,
  onItemClick
}: CircularGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const app = new GalleryApp(containerRef.current, {
      items,
      bend,
      textColor,
      borderRadius,
      font,
      scrollSpeed,
      scrollEase,
      onActiveIndexChange,
      onItemClick
    });

    return () => {
      app.destroy();
    };
  }, [items, bend, textColor, borderRadius, font, scrollSpeed, scrollEase, onActiveIndexChange, onItemClick]);

  return <div className="circular-gallery" ref={containerRef} />;
}
