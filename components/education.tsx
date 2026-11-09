"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EDUCATION, LANGUAGES } from "@/lib/data";
import { DoodleLeaf, DoodleStar } from "./doodles";
import { Hand, PaperCard, SectionLabel, Stamp, Tape } from "./sketch";

const LEVEL_DOTS: Record<string, number> = {
  "Português": 10,
  "Inglês": 8,
};

export default function Education() {
  const reduce = useReducedMotion();

  return (
    <section id="formacao" className="scroll-mt-24">
      <SectionLabel meta="base acadêmica">formação & idiomas</SectionLabel>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
        >
          <PaperCard ruled className="relative h-full p-6 sm:p-7">
            <Tape className="-top-3 left-10 h-6 w-24" tint="sky" tilt={-3} />
            <div className="space-y-6">
              {EDUCATION.map((entry, index) => (
                <div
                  key={entry.institution}
                  className={index > 0 ? "border-t border-dashed border-line pt-6" : ""}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Stamp>{index === 0 ? "em curso" : "concluído"}</Stamp>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                      {entry.period}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl leading-tight text-ink sm:text-2xl">
                    {entry.degree}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 font-hand text-lg leading-none text-sage-deeper">
                    <DoodleStar className="h-3 w-3" />
                    {entry.institution}
                  </p>
                </div>
              ))}
            </div>
            <DoodleLeaf className="absolute bottom-4 right-5 h-10 w-8 rotate-6 text-sage-deep/50" />
          </PaperCard>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="space-y-5"
        >
          <PaperCard className="p-5">
            <Hand className="text-xl text-ink">idiomas</Hand>
            <ul className="mt-4 space-y-4">
              {LANGUAGES.map((language) => {
                const filled = LEVEL_DOTS[language.language] ?? 6;
                return (
                  <li key={language.language}>
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-display text-base text-ink">
                        {language.language}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                        {language.level}
                      </span>
                    </div>
                    <div className="mt-1.5 flex gap-1" aria-hidden>
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span
                          key={i}
                          className={[
                            "h-1.5 w-1.5 rounded-full",
                            i < filled ? "bg-sage-deep/70" : "bg-line-strong/40",
                          ].join(" ")}
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </PaperCard>

          <div className="rotate-[-1.5deg] border border-line bg-sky-soft px-5 py-4 paper-shadow-soft">
            <Hand className="text-lg leading-snug text-blue-ink">
              “aprender em público é mais honesto.”
            </Hand>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-sky-deep/80">
              nota do caderno
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
