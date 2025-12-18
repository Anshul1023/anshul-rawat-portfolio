import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { summary } from "@/data/portfolio";
import ScrollFloat from "@/components/ScrollFloat";
import CardSwap, { Card } from "@/components/CardSwap";

// WEBP IMAGES
import expImg from "../../assets/exp.webp";
import proImg from "../../assets/pro.webp";
import techImg from "../../assets/tech.webp";
import mindImg from "../../assets/mind.webp";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        const words = summary.split(" ");

        textRef.current.innerHTML = words
          .map((w) => `<span class="about-word inline-block mr-2">${w}</span>`)
          .join("");

        gsap.fromTo(
          ".about-word",
          {
            opacity: 0,
            x: -120,
            skewX: -8,
            filter: "blur(4px)",
          },
          {
            opacity: 1,
            x: 0,
            skewX: 0,
            filter: "blur(0)",
            duration: 0.45,
            stagger: 0.016,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-background to-card/30 relative z-[50]"
    >
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6">

        {/* Heading */}
        <div className="mb-16 md:mb-24 text-center">
          <ScrollFloat
            textClassName="about-title text-primary text-lg md:text-2xl tracking-[0.35em] mb-6 font-bold"
          >
            ABOUT ME
          </ScrollFloat>

          <ScrollFloat
            textClassName="about-title text-headline font-display text-muted-foreground"
          >
           High-Performance Web Engineer
          </ScrollFloat>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* LEFT — SUMMARY */}
          <div>
            <p
              ref={textRef}
              className="
                text-[26px] md:text-[28px]
                text-muted-foreground/90
                leading-[1.55]
                max-w-[900px]
                tracking-wide
              "
            >
              {summary}
            </p>
          </div>

          {/* RIGHT — CARD SWAP */}
          <div className="flex justify-end items-center">
            <CardSwap width={900} height={600} delay={2600}>

              {/* CARD 1 */}
              <Card>
                <div className="relative w-full h-full card-img-wrap">
                  <img
                    src={expImg}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    className="card-img"
                  />
                  <div className="card-overlay">
                    <span className="text-7xl text-gradient">5+</span>
                    <p className="text-muted-foreground mt-4 text-2xl">
                      Months Experience
                    </p>
                  </div>
                </div>
              </Card>

              {/* CARD 2 */}
              <Card>
                <div className="relative w-full h-full card-img-wrap">
                  <img src={proImg} loading="lazy" decoding="async" className="card-img" />
                  <div className="card-overlay">
                    <span className="text-7xl text-gradient">10+</span>
                    <p className="text-muted-foreground mt-4 text-2xl">
                      Projects
                    </p>
                  </div>
                </div>
              </Card>

              {/* CARD 3 */}
              <Card>
                <div className="relative w-full h-full card-img-wrap">
                  <img src={techImg} loading="lazy" decoding="async" className="card-img" />
                  <div className="card-overlay">
                    <span className="text-7xl text-gradient">20+</span>
                    <p className="text-muted-foreground mt-4 text-2xl">
                      Technologies
                    </p>
                  </div>
                </div>
              </Card>

              {/* CARD 4 */}
              <Card>
                <div className="relative w-full h-full card-img-wrap">
                  <img src={mindImg} loading="lazy" decoding="async" className="card-img" />
                  <div className="card-overlay">
                    <span className="text-7xl text-gradient">∞</span>
                    <p className="text-muted-foreground mt-4 text-2xl">
                      Learning Mindset
                    </p>
                  </div>
                </div>
              </Card>

            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
