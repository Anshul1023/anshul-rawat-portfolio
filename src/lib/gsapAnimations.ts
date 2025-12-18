// src/lib/gsapAnimations.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function killAllStoryTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}

function q(root: HTMLElement, selector: string) {
  return root.querySelectorAll(selector);
}

/* --------------------------------------------
   STORY EFFECTS
---------------------------------------------*/

// Hero reveal
export function storyHeroReveal(root: HTMLElement) {
  gsap.from(q(root, ".story-hero-reveal"), {
    yPercent: 8,
    opacity: 0,
    scale: 1.03,
    duration: 1.3,
    ease: "power3.out",
  });
}

// Text line reveal
export function storyTextLine(root: HTMLElement) {
  gsap.from(q(root, ".story-text-line"), {
    y: 28,
    opacity: 0,
    skewY: 4,
    duration: 1,
    stagger: 0.05,
    ease: "power3.out",
    scrollTrigger: { trigger: root, start: "top 85%" },
  });
}

// Stagger rise
export function storyStaggerRise(root: HTMLElement) {
  gsap.from(q(root, ".story-stagger-rise"), {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: root, start: "top 90%" },
  });
}

// Parallax layers
export function storyParallaxLayers(root: HTMLElement) {
  q(root, ".story-parallax-layer").forEach((el, i) => {
    const depth = Number((el as HTMLElement).dataset.depth || 0.15 + i * 0.05);
    gsap.to(el, {
      yPercent: -20 * depth,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });
}

// Masked title
export function storyMaskTitle(root: HTMLElement) {
  q(root, ".story-mask-title .mask-text").forEach((text) => {
    gsap.fromTo(
      text,
      { yPercent: 110 },
      {
        yPercent: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 90%" },
      }
    );
  });
}

// Project reveal
export function storyProjectReveal(root: HTMLElement) {
  gsap.from(q(root, ".story-project-reveal"), {
    y: 40,
    opacity: 0,
    stagger: 0.15,
    ease: "power3.out",
    duration: 0.9,
    scrollTrigger: { trigger: root, start: "top 85%" },
  });
}

// Pan image
export function storyPanImage(root: HTMLElement) {
  gsap.fromTo(
    q(root, ".story-pan-image"),
    { scale: 1.12, yPercent: 8 },
    {
      scale: 1,
      yPercent: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: root,
        start: "top 95%",
        scrub: true,
      },
    }
  );
}

// CTA bloom
export function storyCtaBloom(root: HTMLElement) {
  gsap.from(q(root, ".story-cta-bloom"), {
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: "back.out(1.3)",
    scrollTrigger: { trigger: root, start: "top 95%" },
  });
}

/* --------------------------------------------
   INITIALIZER
---------------------------------------------*/

export function initStoryAnimations(root: HTMLElement | null) {
  if (!root) return;

  killAllStoryTriggers();

  storyHeroReveal(root);
  storyTextLine(root);
  storyStaggerRise(root);
  storyParallaxLayers(root);
  storyMaskTitle(root);
  storyPanImage(root);
  storyProjectReveal(root);
  storyCtaBloom(root);
}
