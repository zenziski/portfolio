"use client";

import { motion, useReducedMotion } from "framer-motion";
import { APPROACH, PROFILE, STATS } from "@/lib/data";
import DotArt from "./dot-art";
import { DoodleStar } from "./doodles";
import Education from "./education";
import Experience from "./experience";
import Projects from "./projects";
import Services from "./services";
import Stack from "./stack";
import {
  ChapterHeading,
  Hand,
  PaperCard,
  SectionLabel,
  StickyNote,
  Tape,
} from "./sketch";

const STAT_TILTS = [-1.8, 1.4, -1.2, 1.8];

interface ProfessionalProps {
  onContact: () => void;
}

export default function Professional({ onContact }: ProfessionalProps) {
  const reduce = useReducedMotion();

  return (
    <section id="profissional" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <ChapterHeading
          index="um"
          kicker="o trabalho"
          title={
            <>
              Sistemas que{" "}
              <em className="italic text-sage-deeper">aguentam</em>.
            </>
          }
          note="onde o café vira código em produção"
        />

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <PaperCard ruled className="relative h-full p-6 sm:p-8">
              <Tape className="-top-3 left-12 h-6 w-24" tint="sage" tilt={-4} />
              <SectionLabel meta="backend · cloud · ia">sobre o trabalho</SectionLabel>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]">
                {PROFILE.intro}
              </p>

              <ul className="mt-6 space-y-2.5">
                {APPROACH.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <DoodleStar className="mt-1.5 h-3.5 w-3.5 shrink-0 text-sage-deep" />
                    <span className="font-hand text-lg leading-snug text-ink">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-dashed border-line pt-4 font-hand text-lg leading-snug text-sage-deeper">
                {PROFILE.note}
              </p>

              <DoodleStar className="absolute bottom-5 right-6 h-5 w-5 text-sky-deep/50" />
            </PaperCard>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <StickyNote
                  tint={index % 2 ? "blue" : "sticky"}
                  tilt={STAT_TILTS[index % STAT_TILTS.length]}
                  className="h-full p-4"
                >
                  <p className="font-display text-3xl leading-none text-ink sm:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-soft">
                    {stat.label}
                  </p>
                  <p className="mt-1 font-hand text-base leading-tight text-ink-soft">
                    {stat.note}
                  </p>
                </StickyNote>
              </motion.div>
            ))}

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: 0.24 }}
              className="col-span-2 rotate-[0.6deg] border border-line bg-paper p-3 paper-shadow-soft"
            >
              <div className="overflow-hidden rounded-sm border border-line/70 bg-sky-soft/40">
                <DotArt
                  variant="wave"
                  className="h-24 w-full"
                  decorative
                />
              </div>
              <div className="mt-2 flex items-center justify-between px-1">
                <Hand className="text-base leading-none text-ink-soft">
                  fluxo, em pontos
                </Hand>
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-ink-faint">
                  estudo #02
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-16 space-y-16 sm:mt-20 sm:space-y-20">
          <Projects />
          <Experience />
          <Stack />
          <Services onContact={onContact} />
          <Education />
        </div>
      </div>
    </section>
  );
}
