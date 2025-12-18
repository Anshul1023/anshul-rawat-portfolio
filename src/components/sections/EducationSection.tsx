import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GraduationCap, Award, Calendar } from "lucide-react"
import { certifications } from "@/data/portfolio"

import degreeImg from "@/assets/degreee.webp"
import schoolImg from "@/assets/school.webp"
import certiImg from "@/assets/certi.webp"

gsap.registerPlugin(ScrollTrigger)

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".edu-heading, .edu-sub",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: ".edu-heading",
            start: "top 85%",
            end: "top 35%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

      gsap.fromTo(
        ".edu-left",
        { opacity: 0, x: -160 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-grid",
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

      gsap.fromTo(
        ".edu-center",
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-grid",
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        }
      )

      gsap.fromTo(
        ".edu-right",
        { opacity: 0, x: 160 },
        {
          opacity: 1,
          x: 0,
          duration: 1.1,
          delay: 0.45,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".edu-grid",
            start: "top 80%",
            end: "bottom 30%",
            toggleActions: "play reverse play reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section-padding bg-black"
    >
      <div className="max-w-[1900px] mx-auto px-12">
        {/* HEADING */}
        <div className="text-center mb-32">
          <p className="edu-sub text-primary tracking-[0.35em] uppercase mb-4">
            BACKGROUND
          </p>

          <h2 className="edu-heading font-display text-7xl md:text-8xl lg:text-[9rem]">
            Education & Certifications
          </h2>
        </div>

        {/* GRID */}
        <div className="edu-grid grid lg:grid-cols-3 gap-24 items-center">
          {/* LEFT */}
          <div className="edu-card edu-left edu-box cursor-target">
            <img src={degreeImg} className="edu-img" />
            <div className="edu-content">
              <div className="edu-icon">
                <GraduationCap />
              </div>
              <h3 className="edu-title">B.Tech, Computer Science</h3>
              <p className="edu-subtext">
                Uttaranchal University, Dehradun
              </p>
              <div className="edu-meta">
                <Calendar size={18} /> Aug 2020 – June 2024
              </div>
            </div>
          </div>

          {/* CENTER */}
          <div className="edu-card edu-center edu-box scale-[1.06] cursor-target">
            <img src={certiImg} className="edu-img" />
            <div className="edu-content">
              <div className="edu-icon">
                <Award />
              </div>

              <h3 className="edu-title mb-6">Certifications</h3>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.title}
                    className="edu-cert cursor-target"
                  >
                    <h4>{cert.title}</h4>
                    <p>
                      {cert.issuer} • {cert.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="edu-card edu-right edu-box cursor-target">
            <img src={schoolImg} className="edu-img" />
            <div className="edu-content">
              <div className="edu-icon">
                <GraduationCap />
              </div>
              <h3 className="edu-title">High School Degree</h3>
              <p className="edu-subtext">
                Govt. Model Sanskriti School, Faridabad
              </p>
              <div className="edu-meta">
                <Calendar size={18} /> Aug 2018 – June 2020
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 3D HOVER (PURE CSS – UNTOUCHED) */}
      <style>{`
        .edu-box {
          position: relative;
          height: 540px;
          border-radius: 34px;
          overflow: hidden;
          background: #111;
          border: 1px solid #ffffff14;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(.2,.8,.2,1);
        }

        .edu-box:hover {
          transform: perspective(1200px)
            rotateX(6deg)
            rotateY(-6deg)
            translateY(-10px)
            scale(1.02);
        }

        .edu-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.12;
          transform: translateZ(-1px);
        }

        .edu-content {
          position: relative;
          z-index: 2;
          padding: 64px;
          transform: translateZ(40px);
        }

        .edu-icon {
          width: 64px;
          height: 64px;
          background: rgba(229,181,0,0.18);
          color: #e5b500;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 28px;
        }

        .edu-title {
          font-size: 30px;
          font-weight: 600;
          margin-bottom: 14px;
        }

        .edu-subtext {
          color: #aaa;
          margin-bottom: 26px;
        }

        .edu-meta {
          display: flex;
          gap: 10px;
          align-items: center;
          color: #e5b500;
          font-size: 16px;
        }

        .edu-cert {
          padding: 16px;
          border-radius: 16px;
          background: rgba(229,181,0,0.08);
          border: 1px solid rgba(229,181,0,0.25);
        }

        .edu-cert p {
          font-size: 13px;
          color: #aaa;
        }
      `}</style>
    </section>
  )
}
