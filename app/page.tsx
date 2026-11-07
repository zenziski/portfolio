import Scanline from "@/components/scanline";
import StatusBar from "@/components/status-bar";
import CommandPalette from "@/components/command-palette";
import BootScreen from "@/components/boot-screen";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import Services from "@/components/services";
import Education from "@/components/education";
import Contact from "@/components/contact";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Scanline />
      <StatusBar />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Experience />
        <Services />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
      <BootScreen />
    </>
  );
}
