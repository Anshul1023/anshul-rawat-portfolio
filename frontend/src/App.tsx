import { useMemo, useState } from "react";

import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { ScrollProgress } from "./components/layout/ScrollProgress";
import { CustomCursor } from "./components/layout/CustomCursor";
import { BackgroundFX } from "./components/effects/BackgroundFX";
import { IntroSequence } from "./components/effects/IntroSequence";
import { ArchitectureSection } from "./components/sections/ArchitectureSection";
import { ContactSection } from "./components/sections/ContactSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { SkillsSection } from "./components/sections/SkillsSection";
import { StorySection } from "./components/sections/StorySection";
import { ProjectModal } from "./components/ui/ProjectModal";
import { navItems, projects } from "./data/portfolio";
import { useActiveSection } from "./hooks/useActiveSection";

type ProjectSelection = (typeof projects)[number] | null;

function App() {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds);
  const [selectedProject, setSelectedProject] = useState<ProjectSelection>(null);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-white">
      <BackgroundFX />
      <IntroSequence />

      <ScrollProgress />
      <CustomCursor />
      <Header activeSection={activeSection} />

      <main className="relative z-10 bg-[#020202]">
        <HeroSection />
        <StorySection />
        <SkillsSection />
        <ProjectsSection setSelectedProject={setSelectedProject} />
        <ArchitectureSection />
        <ContactSection />
      </main>

      <Footer />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default App;
