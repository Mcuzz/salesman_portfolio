import { useState } from "react";
import Layout from "../components/layout/Layout";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Home/Hero";
import ProjectsGrid from "../components/Home/ProjectsGrid";
import ArtisticSection from "../components/Home/ArtisticSection";
import Footer from "../components/Home/Footer";
import { projects } from "../data/projects";

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("Architectural projects");
  const [navbarInverted, setNavbarInverted] = useState(false);

  return (
    <Layout>
      <Navbar inverted={navbarInverted} />
      <main className="pt-10">
        <Hero 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          navbarInverted={navbarInverted} 
          setNavbarInverted={setNavbarInverted}
        />
        {activeSection === "Architectural projects" && (
          <ProjectsGrid 
            projects={projects} 
            activeProject={activeProject} 
            setActiveProject={setActiveProject} 
          />
        )}
        {activeSection === "Artistic projects" && <ArtisticSection />}
        <Footer />
      </main>
    </Layout>
  );
}
