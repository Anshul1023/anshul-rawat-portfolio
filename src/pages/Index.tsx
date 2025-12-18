import { useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';

import Navbar from '@/components/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import EducationSection from '@/components/sections/EducationSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

import { personalInfo } from '@/data/portfolio';

const Index = () => {
  // Smooth scrolling via Lenis
  useLenis();

  // Update page title
  useEffect(() => {
    document.title = `${personalInfo.name} | Full Stack Developer Portfolio`;
  }, []);

  return (
    <main className="relative story-root">
      {/* Global Navigation */}
      <Navbar />

      {/* Cinematic Hero */}
      <HeroSection />

      {/* Story Sequence */}
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
