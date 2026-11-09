"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Boxes, Globe, Plug, SquareCode, X } from "lucide-react";
import { PROJECTS, type Project } from "@/lib/data";
import {
  DoodleCloud,
  DoodleCode,
  DoodleCompass,
  DoodleMoon,
  DoodlePaperclip,
  DoodleStar,
  DoodleSun,
} from "./doodles";
import { Hand, PaperCard, SectionLabel, Sticker, Tape } from "./sketch";

const TYPE_LABEL: Record<Project["type"], string> = {
  app: "produto",
  api: "serviço",
  infra: "infraestrutura",
  site: "site",
};

const TYPE_ICON: Record<Project["type"], React.ReactNode> = {
  app: <SquareCode className="h-4 w-4" />,
  api: <Plug className="h-4 w-4" />,
  infra: <Boxes className="h-4 w-4" />,
  site: <Globe className="h-4 w-4" />,
};

const CARD_DOODLES = [
  DoodleCode,
  DoodleCloud,
  DoodleMoon,
  DoodleCompass,
  DoodleStar,
  DoodleSun,
  DoodlePaperclip,
  DoodleCode,
];

const TAPES: ("sage" | "sky" | "cream")[] = ["sage", "sky", "cream", "sage"];
const TILTS = [-1.2, 1.4, -0.8, 1.1, -1.5, 0.9, -1, 1.3];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="projetos" className="scroll-mt-24">
      <SectionLabel meta={`${PROJECTS.length} estudos de caso`}>
        coisas que construí
      </SectionLabel>
      <p className="mt-4 max-w-xl font-hand text-xl leading-snug text-ink-soft">
        projetos reais, com problema, solução e o que mudou de verdade. clique
        em uma página para abrir o caderno.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project, index) => {
          const Doodle = CARD_DOODLES[index % CARD_DOODLES.length];
          const tape = TAPES[index % TAPES.length];
          const tilt = TILTS[index % TILTS.length];
          return (
            <motion.article
              key={project.id}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
              className="group relative block text-left"
            >
              <div style={{ transform: `rotate(${tilt}deg)` }}>
              <PaperCard className="flex h-full flex-col p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:paper-shadow group-hover:rotate-0">
                <Tape
                  className="-top-2.5 right-7 h-5 w-20"
                  tint={tape}
                  tilt={index % 2 ? 4 : -5}
                />
                <div className="flex items-start justify-between gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                    estudo {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-xl italic text-sage-deep/60">
                    {project.year}
                  </span>
                </div>

                <div className="relative mt-4 flex h-20 items-center justify-center rounded-sm border border-dashed border-line bg-paper-2/50">
                  <Doodle className="h-11 w-11 text-sage-deeper/70 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" />
                  <span className="absolute bottom-1.5 right-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                    {TYPE_ICON[project.type]}
                    {TYPE_LABEL[project.type]}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-xl leading-tight text-ink group-hover:text-sage-deeper">
                  {project.name}
                </h3>
                <p className="mt-2 line-clamp-3 text-[13px] leading-relaxed text-ink-soft">
                  {project.tagline}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 3).map((tech) => (
                    <Sticker key={tech} tint={index % 2 ? "sky" : "sage"}>
                      {tech}
                    </Sticker>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="font-mono text-[10px] text-ink-faint">
                      +{project.stack.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-dashed border-line pt-3">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
                      {project.metrics[0].label}
                    </p>
                    <p className="font-display text-lg leading-none text-sage-deeper">
                      {project.metrics[0].value}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors group-hover:text-sky-deep">
                    abrir página
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </PaperCard>
              </div>
              <button
                type="button"
                onClick={() => setActive(project)}
                className="absolute inset-0 z-10 rounded-sm"
                aria-label={`Abrir estudo de caso: ${project.name}`}
              />
            </motion.article>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto px-3 py-6 sm:px-6 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="fixed inset-0 bg-ink/45 backdrop-blur-sm"
              onClick={() => setActive(null)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-title"
              initial={reduce ? false : { opacity: 0, y: 26, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative my-auto w-full max-w-4xl border border-line bg-paper paper-shadow"
            >
              <Tape className="-top-3 left-1/2 h-7 w-32 -translate-x-1/2" tint="sage" tilt={-2} />

              <div className="flex items-start justify-between gap-4 border-b border-line bg-paper-2/70 px-5 py-4 sm:px-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                    estudo de caso · {active.year} · {TYPE_LABEL[active.type]}
                  </p>
                  <h3
                    id="project-title"
                    className="mt-1 font-display text-2xl leading-tight text-ink sm:text-3xl"
                  >
                    {active.name}
                  </h3>
                  <p className="mt-1 font-hand text-lg text-sage-deeper">
                    {active.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink-soft transition-colors hover:border-sage-deep hover:text-sage-deeper"
                  aria-label="Fechar estudo de caso"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[70vh] overflow-y-auto px-5 py-6 sm:px-8">
                <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-deep">
                        o problema
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {active.problem}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-sky-deep">
                        a solução
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                        {active.solution}
                      </p>
                    </div>
                    <div className="border-l-2 border-sage-deep bg-mint/60 px-4 py-3">
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage-deeper">
                        o que mudou
                      </h4>
                      <p className="mt-1.5 font-hand text-xl leading-snug text-ink">
                        {active.impact}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <DoodleStar className="mt-1 h-4 w-4 shrink-0 text-sage-deep" />
                      <p className="font-hand text-lg leading-snug text-ink-soft">
                        {active.note}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-5 md:border-l md:border-dashed md:border-line md:pl-8">
                    <div className="grid grid-cols-3 gap-2">
                      {active.metrics.map((metric) => (
                        <div
                          key={metric.label}
                          className="border border-line bg-paper-2/60 px-2 py-2.5 text-center"
                        >
                          <p className="font-display text-lg leading-none text-sage-deeper">
                            {metric.value}
                          </p>
                          <p className="mt-1 font-mono text-[8px] uppercase leading-tight tracking-[0.1em] text-ink-faint">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                        stack
                      </h4>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {active.stack.map((tech) => (
                          <Sticker key={tech} tint="sage">
                            {tech}
                          </Sticker>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                          um pedaço do código
                        </h4>
                        <span className="font-mono text-[9px] text-ink-faint">
                          {active.code.file}
                        </span>
                      </div>
                      <pre className="mt-2 overflow-x-auto rounded-sm border border-ink/20 bg-ink p-3 font-mono text-[11px] leading-relaxed text-mint">
                        {active.code.lines.map((line, i) => (
                          <div key={i} className="flex gap-3">
                            <span className="select-none text-paper/30">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="whitespace-pre">{line}</span>
                          </div>
                        ))}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-5 py-3 sm:px-8">
                <Hand className="text-lg text-ink-faint">
                  anotado no caderno em {active.year}
                </Hand>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-sm border border-line-strong px-4 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-sage-deep hover:text-sage-deeper"
                >
                  fechar · esc
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
