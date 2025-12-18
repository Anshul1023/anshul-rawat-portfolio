import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "@/assets/fmee.png";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.85,
        rotateY: 40,
        rotateX: 18,
      });

      gsap.set(detailsRef.current?.children || [], {
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

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=220%",
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
        detailsRef.current?.children || [],
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen bg-black overflow-hidden"
    >
      <div className="relative max-w-[1800px] mx-auto px-[10px] h-screen">
        <div className="grid grid-cols-12 h-full items-center">

          {/* ================= LEFT TEXT ================= */}
          <div className="col-span-6 z-20">

            {/* NAME WRAPPER (NO CROP EVER, RESPONSIVE) */}
            <div className="max-w-[1200px]">
              <h1
                ref={nameRef}
                className="
      font-serif
      text-gradient
      leading-[0.95]
      whitespace-nowrap
      -ml-[4px]
      text-[clamp(56px,12vw,150px)]
    "
              >
                Anshul Rawat
              </h1>
            </div>


            {/* DETAILS */}
            <div
              ref={detailsRef}
              className="mt-12 space-y-10 max-w-[1000px]"
            >
              <p className="text-[#d4a84f] uppercase tracking-[0.45em] text-[30px]">
                Full Stack Developer
              </p>

              <p className="text-gray-400 text-[30px] leading-relaxed">
                Full-stack developer crafting{" "}
                <span className="text-white font-medium">scalable, high-performance, responsive web experiences and robust APIs</span>, high-
                with a cinematic approach to design, motion, and interaction.
              </p>

              <div className="flex gap-10 text-gray-500 text-sm pt-4">
                <span>✉️ anshulrawat5124@gmail.com</span>
                <span>🔗 LinkedIn</span>
                <span>📍 Faridabad</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT IMAGE ================= */}
          <div className="col-span-5 col-start-8 flex justify-end">
            <div
              ref={imageRef}
              className="
      relative
      hero-image
      w-[clamp(220px,40vw,640px)]
      h-[clamp(320px,60vh,900px)]
    "
            >
              <img
                src={profileImg}
                alt="Anshul Rawat"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
