import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import profileImg from "@/assets/fmee.webp";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const details = detailsRef.current
        ? Array.from(detailsRef.current.children)
        : [];

      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.85,
        rotateY: 40,
        rotateX: 18,
      });

      gsap.set(details, {
        opacity: 0,
        y: 40,
      });

      gsap.fromTo(
        nameRef.current,
        { opacity: 0, y: 120, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.6,
          ease: "power4.out",
        }
      );

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
          },
        });

        tl.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
        });

        tl.to(
          details,
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.35"
        );
      });

      mm.add("(max-width: 1024px)", () => {
        gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
        })
          .to(imageRef.current, {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            duration: 0.9,
          })
          .to(
            details,
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              duration: 0.7,
            },
            "-=0.35"
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden bg-black"
    >
      <div className="relative mx-auto min-h-screen max-w-[1800px] px-5 sm:px-8 lg:px-10">
        <div className="grid min-h-screen grid-cols-1 items-center gap-12 py-28 lg:grid-cols-12 lg:gap-8 lg:py-0">
          <div className="z-20 lg:col-span-6">
            <div className="max-w-[1200px]">
              <h1
                ref={nameRef}
                className="
                  -ml-[4px] text-[clamp(3.5rem,12vw,9.5rem)] leading-[0.95]
                  text-gradient lg:whitespace-nowrap
                "
              >
                Anshul Rawat
              </h1>
            </div>

            <div
              ref={detailsRef}
              className="mt-8 max-w-[1000px] space-y-7 md:mt-12 md:space-y-10"
            >
              <p className="text-[0.95rem] uppercase tracking-[0.45em] text-[#d4a84f] sm:text-[1.1rem] lg:text-[1.55rem]">
                Full Stack Developer
              </p>

              <p className="max-w-3xl text-lg leading-relaxed text-gray-400 sm:text-xl lg:text-[1.85rem]">
                Full-stack developer crafting{" "}
                <span className="font-medium text-white">
                  scalable, high-performance, responsive web experiences and robust APIs
                </span>{" "}
                with a cinematic approach to design, motion, and interaction.
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-sm text-gray-400 lg:gap-x-10">
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=anshulrawat5124@gmail.com"
                  className="transition hover:text-white"
                >
                  Email
                </a>

                <a
                  href="https://www.linkedin.com/in/anshul-rawat-235019290/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/Anshul1023"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  GitHub
                </a>

                <a
                  href="https://www.google.com/maps/place/28%C2%B021'50.9%22N+77%C2%B016'59.7%22E/@28.3641411,77.2806631,17z/data=!3m1!4b1!4m4!3m3!8m2!3d28.3641411!4d77.283238?hl=en&entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Faridabad
                </a>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:col-start-8 lg:justify-end">
            <div
              ref={imageRef}
              className="
                hero-image relative h-[clamp(320px,60vh,900px)]
                w-[min(88vw,440px)] lg:w-[clamp(280px,40vw,640px)]
              "
            >
              <img
                src={profileImg}
                alt="Anshul Rawat"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="h-full w-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
