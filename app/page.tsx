"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Area } from "@/lib/data";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Personal from "@/components/personal";
import Professional from "@/components/professional";
import SketchbookNav from "@/components/sketchbook-nav";

export default function Home() {
  const [area, setArea] = useState<Area>("profissional");
  const reduce = useReducedMotion();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  const navigate = (id: string) => {
    if (id === "profissional" || id === "pessoal") {
      setArea(id);
      scrollTo("capitulo");
      return;
    }
    if (id === "contato") {
      scrollTo("contato");
      return;
    }
    scrollTo("capa");
  };

  return (
    <>
      <SketchbookNav area={area} onNavigate={navigate} />
      <main>
        <Hero onNavigate={navigate} />

        <div id="capitulo" className="scroll-mt-16">
          <motion.div
            key={area}
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {area === "profissional" ? (
              <Professional onContact={() => navigate("contato")} />
            ) : (
              <Personal />
            )}
          </motion.div>
        </div>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
