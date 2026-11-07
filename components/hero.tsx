"use client";

import { motion } from "framer-motion";
import { ArrowDown, GitCommitHorizontal, Rocket, TerminalSquare } from "lucide-react";
import { SITE } from "@/lib/data";

const STACK = [
  "TypeScript",
  "Node.js",
  "Python",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Kafka",
  "Kubernetes",
  "Azure",
  "AWS",
  "GCP",
  "Docker",
];

const STATS = [
  { value: "6+", label: "anos de experiência" },
  { value: "45%", label: "economia de infra" },
  { value: "US$ 32K", label: "reduzidos / mês" },
  { value: "10x", label: "ganho de latência" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-terminal/5 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            >
              <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-terminal">
                <TerminalSquare className="h-4 w-4" />
                Engenheiro Backend Sênior
              </p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                <span className="text-ink">Matheus Zenziski.</span>{" "}
                <span className="text-terminal terminal-glow-soft">
                  Backend distribuído e IA em produção.
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-mist">
                Engenheiro backend com <span className="text-ink">6+ anos</span> projetando
                e escalando arquiteturas cloud-native e sistemas de IA.{" "}
                <span className="text-ink">Node.js</span>,{" "}
                <span className="text-ink">TypeScript</span>,{" "}
                <span className="text-ink">Python</span>, LLM, Kafka e Kubernetes — com foco
                em resultados mensuráveis de <span className="text-ink">custo, latência e escala</span>.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {STACK.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-line px-2 py-1 font-mono text-[11px] text-mist transition-colors hover:border-terminal/40 hover:text-terminal"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#contato"
                  className="group flex items-center gap-2 rounded border border-terminal bg-terminal/10 px-5 py-3 font-mono text-sm font-semibold text-terminal transition-all hover:bg-terminal hover:text-void hover:shadow-[0_0_24px_rgba(0,255,102,0.35)]"
                >
                  <span className="transition-transform group-hover:translate-x-0.5">
                    &gt; iniciar projeto
                  </span>
                  <Rocket className="h-4 w-4" />
                </a>
                <a
                  href="#experiencia"
                  className="flex items-center gap-2 rounded border border-line px-5 py-3 font-mono text-sm text-mist transition-colors hover:border-terminal/40 hover:text-terminal"
                >
                  <GitCommitHorizontal className="h-4 w-4" />
                  git log --experience
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <div className="rounded-lg border border-line bg-panel p-6">
              <div className="mb-5 flex items-center justify-between border-b border-line pb-3 font-mono text-xs text-mist">
                <span className="flex items-center gap-2">
                  <TerminalSquare className="h-4 w-4 text-terminal" />
                  profile.ts
                </span>
                <span className="text-terminal">{SITE.version}</span>
              </div>
              <dl className="grid grid-cols-2 gap-5">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-mono text-[11px] uppercase tracking-wider text-mist">
                      {stat.label}
                    </dt>
                    <dd className="font-mono text-2xl font-bold text-terminal terminal-glow-soft">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 space-y-2 border-t border-line pt-4 font-mono text-xs text-mist">
                <p>
                  <span className="text-terminal">local:</span> {SITE.location}
                </p>
                <p>
                  <span className="text-terminal">email:</span> {SITE.email}
                </p>
                <p>
                  <span className="text-terminal">fuso:</span> BRT ↔ UTC-3
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 flex justify-center">
          <a
            href="#projetos"
            className="flex items-center gap-2 font-mono text-xs text-mist transition-colors hover:text-terminal"
          >
            scroll para explorar <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
