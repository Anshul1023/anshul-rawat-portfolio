import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Send,
} from "lucide-react"
import { personalInfo } from "@/data/portfolio"
import { toast } from "@/hooks/use-toast"

gsap.registerPlugin(ScrollTrigger)

const GOLD = "#D4A017"

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ================= GSAP ================= */

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true })

      gsap.set(".contact-heading", { opacity: 0, y: 120 })
      gsap.set(".contact-block", { opacity: 0, y: 80 })

      tl.to(".contact-heading", {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power4.out",
      }).to(
        ".contact-block",
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.2,
          ease: "power3.out",
        },
        "-=0.6"
      )

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => tl.restart(),
        onEnterBack: () => tl.restart(),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  /* ================= FORM → API ================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("https://contact-backend-70vm.onrender.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error("API Error")
      }

      await res.json()

      toast({
        title: "Message Sent",
        description: "I’ll get back to you shortly.",
      })

      setFormData({
        name: "",
        email: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClass =
    "cursor-target w-full rounded-2xl bg-[#0b0b0b] border border-white/10 px-6 py-5 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D4A017] transition"

  /* ================= JSX ================= */

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen bg-black flex items-center justify-center px-8 py-32"
    >
      <div className="w-full max-w-7xl">
        {/* HEADING */}
        <div className="text-center mb-24">
          <h2 className="contact-heading font-serif text-6xl md:text-7xl text-white mb-6">
            CONTACT <span style={{ color: GOLD }}>US</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Let’s build something meaningful together. I’m always open to
            discussing new ideas or opportunities.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-24">
          {/* LEFT */}
          <div className="space-y-16 contact-block">
            {[
              { icon: <Mail />, label: "Email", value: personalInfo.email },
              { icon: <Phone />, label: "Phone", value: personalInfo.contact },
              { icon: <Linkedin />, label: "LinkedIn", value: "Anshul Rawat" },
              { icon: <MapPin />, label: "Location", value: personalInfo.address },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{ background: `${GOLD}22`, color: GOLD }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-lg text-gray-400">{item.label}</p>
                  <p className="text-xl text-white font-medium">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="contact-block space-y-8">
            <input
              className={inputClass}
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />

            <input
              className={inputClass}
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <textarea
              rows={6}
              className={inputClass}
              placeholder="Tell me about your project..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />

            <button
              disabled={isSubmitting}
              className="cursor-target w-full rounded-2xl py-6 text-xl font-semibold flex items-center justify-center gap-3 transition hover:scale-[1.02]"
              style={{ background: GOLD, color: "#000" }}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
