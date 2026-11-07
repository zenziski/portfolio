"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow,
  Boxes,
  ExternalLink,
  FolderOpen,
  GitBranch,
  Globe,
  LayoutDashboard,
  Plug,
  X,
} from "lucide-react";
import type { Project } from "@/lib/data";
import { PROJECTS } from "@/lib/data";
import SectionHeader from "./section-header";

const TYPE_ICON: Record<Project["type"], React.ReactNode> = {
  app: <AppWindow className="h-4 w-4" />,
  api: <Plug className="h-4 w-4" />,
  site: <Globe className="h-4 w-4" />,
  infra: <Boxes className="h-4 w-4" />,
};

const TYPE_LABEL: Record<Project["type"], string> = {
  app: "APP",
  api: "API",
  site: "SITE",
  infra: "INFRA",
};

const STATUS: Record<Project["status"], { label: string; cls: string; dot: string }> = {
  online: { label: "ONLINE", cls: "text-terminal", dot: "bg-terminal" },
  progress: { label: "EM DEV", cls: "text-amber-400", dot: "bg-amber-400" },
  archived: { label: "ARQUIVADO", cls: "text-mist", dot: "bg-mist" },
};

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useEffect(() => {
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <section id="projetos" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader
          index="01"
          title="Projetos"
          command="ls --cases"
          description="Cases reais de engenharia backend, IA e cloud. Clique em um arquivo para abrir o registro completo: problema, solução, stack e métricas de impacto."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-lg border border-line bg-panel"
        >
          <div className="flex items-center gap-4 border-b border-line bg-panel-2 px-4 py-2.5 font-mono text-[11px] text-mist">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-terminal/70" />
            </div>
            <span className="hidden sm:block">
              matheus@portfolio:~/cases <span className="text-terminal">$</span>
            </span>
            <span className="ml-auto flex items-center gap-1 text-terminal">
              <FolderOpen className="h-3.5 w-3.5" /> {PROJECTS.length} arquivos
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {PROJECTS.map((project, i) => {
              const status = STATUS[project.status];
              return (
                <motion.button
                  key={project.id}
                  type="button"
                  layoutId={`project-${project.id}`}
                  onClick={() => setActive(project)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="group relative flex flex-col border-b border-r border-line bg-panel p-5 text-left transition-colors hover:bg-panel-2"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-terminal">{TYPE_ICON[project.type]}</span>
                    <span className={`flex items-center gap-1.5 font-mono text-[10px] ${status.cls}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {status.label}
                    </span>
                  </div>
                  <div className="font-mono text-sm text-ink group-hover:text-terminal">
                    {project.name}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-mist">
                    {TYPE_LABEL[project.type]} · {project.stack.length} libs
                  </div>
                  <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-mist">
                    {project.tagline}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-line pt-3 font-mono text-[10px] text-mist">
                    <span>{project.metrics[0].label}</span>
                    <span className="text-terminal">{project.metrics[0].value}</span>
                  </div>
                  <span className="absolute bottom-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="font-mono text-[10px] text-terminal">&gt;_</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <>
            <motion.div
              key={`backdrop-${active.id}`}
              className="fixed inset-0 z-[60] bg-void/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            />
            <motion.div
              key={`modal-${active.id}`}
              layoutId={`project-${active.id}`}
              className="fixed inset-0 z-[70] mx-auto my-auto h-fit max-h-[85vh] w-[92vw] max-w-3xl overflow-y-auto rounded-lg border border-line-strong bg-panel shadow-2xl shadow-black/70"
            >
              <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-panel-2 px-5 py-3 font-mono text-xs text-mist">
                <span className="text-terminal">{TYPE_ICON[active.type]}</span>
                <span className="text-ink">{active.name}</span>
                <span className="text-terminal-dim">{TYPE_LABEL[active.type]}</span>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="ml-auto rounded p-1 text-mist transition-colors hover:bg-line hover:text-terminal"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {active.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[10px] text-terminal"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  {active.metrics.map((m) => (
                    <div key={m.label} className="rounded border border-line bg-panel-2 p-3">
                      <div className="font-mono text-lg font-bold text-terminal">
                        {m.value}
                      </div>
                      <div className="mt-1 text-[11px] text-mist">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-mist">
                      <span className="text-terminal">$</span> problema.txt
                    </h3>
                    <p className="text-sm leading-relaxed text-ink">{active.problem}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-mist">
                      <span className="text-terminal">$</span> solucao.txt
                    </h3>
                    <p className="text-sm leading-relaxed text-ink">{active.solution}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-mono text-xs uppercase tracking-widest text-mist">
                      <span className="text-terminal">$</span> diff --impact
                    </h3>
                    <p className="rounded border border-line bg-void p-3 text-sm leading-relaxed text-terminal">
                      &gt; {active.impact}
                    </p>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <h3 className="font-mono text-xs uppercase tracking-widest text-mist">
                        <span className="text-terminal">$</span> cat {active.code.file}
                      </h3>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-mist/60">
                        snippet ilustrativo
                      </span>
                    </div>
                    <pre className="overflow-x-auto rounded-lg border border-line bg-void p-4 font-mono text-xs leading-relaxed text-mist">
                      {active.code.lines.map((line, i) => (
                        <div key={i}>
                          <span className="mr-3 select-none text-mist/40">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {line}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
                  {active.links.demo && (
                    <a
                      href={active.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded border border-terminal bg-terminal/10 px-4 py-2 font-mono text-xs text-terminal transition-colors hover:bg-terminal hover:text-void"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> ver demo
                    </a>
                  )}
                  {active.links.repo && (
                    <a
                      href={active.links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded border border-line px-4 py-2 font-mono text-xs text-mist transition-colors hover:border-terminal/40 hover:text-terminal"
                    >
                      <GitBranch className="h-3.5 w-3.5" /> ver código
                    </a>
                  )}
                  <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-mist">
                    <LayoutDashboard className="h-3 w-3" /> esc para fechar
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
