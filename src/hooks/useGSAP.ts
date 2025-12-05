import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPReveal = (selector: string, options?: gsap.TweenVars) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          y: 60,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
          ...options,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, options]);
};

export const useGSAPParallax = (selector: string, speed: number = 0.5) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      gsap.to(element, {
        y: () => -ScrollTrigger.maxScroll(window) * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, speed]);
};

export const useStaggerReveal = (containerSelector: string, childSelector: string) => {
  useEffect(() => {
    const containers = document.querySelectorAll(containerSelector);
    
    containers.forEach((container) => {
      const children = container.querySelectorAll(childSelector);
      
      gsap.fromTo(
        children,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [containerSelector, childSelector]);
};

export const useTextReveal = (selector: string) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach((element) => {
      const text = element.textContent || '';
      element.innerHTML = '';
      
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(50px)';
        element.appendChild(span);
      });

      const spans = element.querySelectorAll('span');
      
      gsap.to(spans, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector]);

  return ref;
};
