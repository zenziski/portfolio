"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EXPERIENCE } from "@/lib/data";
import { DoodlePin } from "./doodles";
import { Hand, PaperCard, SectionLabel, Sticker, Tape } from "./sketch";

const TILTS = [-0.6, 0.5, -0.4, 0.6];

export default function Experience() {
  const reduce = useReducedMotion();

  return (
    <section id="experiencia" className="scroll-mt-24">
      <SectionLabel meta={`${EXPERIENCE.length} paradas`}>
        notas de campo
      </SectionLabel>
      <p className="mt-4 max-w-xl font-hand text-xl leading-snug text-ink-soft">
        o caminho até aqui, com as entregas que realmente importaram.
      </p>

      <div className="relative mt-8 pl-7 sm:pl-10">
        <span
          aria-hidden
          className="absolute bottom-4 left-[9px] top-4 border-l border-dashed border-line-strong sm:left-[13px]"
        />
        <ol className="space-y-6">
          {EXPERIENCE.map((job, index) => (
            <motion.li
              key={`${job.company}-${job.date}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -left-7 top-5 flex h-5 w-5 items-center justify-center rounded-full border border-line bg-paper sm:-left-10"
              >
                <DoodlePin
                  className={`h-4 w-4 ${
                    job.current ? "text-sage-deep" : "text-sky-deep/70"
                  }`}
                />
              </span>

              <div style={{ transform: `rotate(${TILTS[index % TILTS.length]}deg)` }}>
                <PaperCard className="p-5 sm:p-6">
                  <Tape
                    className="-top-2.5 left-8 h-5 w-20"
                    tint={index % 2 ? "sky" : "sage"}
                    tilt={index % 2 ? 3 : -4}
                  />
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl leading-tight text-ink sm:text-2xl">
                        {job.role}
                      </h3>
                      <p className="mt-0.5 font-hand text-lg leading-none text-sage-deeper">
                        {job.company} · {job.place}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                        {job.period}
                      </span>
                      {job.current && (
                        <Sticker tint="mint" className="rotate-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-sage-deep animate-breathe" />
                          ainda aqui
                        </Sticker>
                      )}
                    </div>
                  </div>

                  <ul className="mt-3 space-y-1.5">
                    {job.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-[13px] leading-relaxed text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-sage-deep/70"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </PaperCard>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      <div className="mt-6 flex items-center gap-2 pl-7 sm:pl-10">
        <Hand className="text-lg text-ink-faint">
          ...e o caderno continua.
        </Hand>
      </div>
    </section>
  );
}
