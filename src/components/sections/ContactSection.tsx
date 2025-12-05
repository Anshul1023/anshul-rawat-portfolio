import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, reference } from '@/data/portfolio';
import { Mail, Phone, MapPin, Linkedin, Send, User, Building2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.contact-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );

      // Contact info items
      gsap.fromTo(
        '.contact-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
          },
        }
      );

      // Form animation
      gsap.fromTo(
        '.contact-form',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 85%',
          },
        }
      );

      // Reference card
      gsap.fromTo(
        '.reference-card',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.reference-card',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding"
    >
      <div className="container-wide">
        {/* Section header */}
        <div className="text-center mb-16 md:mb-24">
          <p className="contact-title text-primary text-sm uppercase tracking-[0.3em] mb-4">
            Get In Touch
          </p>
          <h2 className="contact-title text-headline font-display">
            Let's <span className="text-gradient">Connect</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="contact-item flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {personalInfo.email}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${personalInfo.contact}`}
                className="contact-item flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    {personalInfo.contact}
                  </p>
                </div>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <p className="font-medium group-hover:text-primary transition-colors">
                    Anshul Rawat
                  </p>
                </div>
              </a>

              <div className="contact-item flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{personalInfo.address}</p>
                </div>
              </div>
            </div>

            {/* Reference */}
            <div className="reference-card premium-card mt-12">
              <h4 className="text-sm uppercase tracking-wider text-primary mb-4">
                Professional Reference
              </h4>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-display text-lg">{reference.name}</p>
                  <p className="text-sm text-muted-foreground">{reference.designation}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Building2 className="w-4 h-4" />
                    <span>{reference.organisation}</span>
                  </div>
                  <a
                    href={`tel:${reference.contact}`}
                    className="text-primary text-sm mt-2 inline-block hover:underline"
                  >
                    {reference.contact}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="contact-form space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Sending...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
