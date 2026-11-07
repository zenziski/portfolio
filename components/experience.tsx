"use client";

import { motion } from "framer-motion";
import { GitCommitHorizontal } from "lucide-react";
import { EXPERIENCE } from "@/lib/data";
import SectionHeader from "./section-header";

export default function Experience() {
  return (
    <section id="experiencia" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader
          index="02"
          title="Experiência"
          command="git log --decorate"
          description="Trajetória profissional como histórico de commits: cargos, stacks e entregas mensuráveis em FinTech e SaaS corporativo."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-lg border border-line bg-panel"
        >
          <div className="flex items-center gap-4 border-b border-line bg-panel-2 px-4 py-2.5 font-mono text-[11px] text-mist">
            <GitCommitHorizontal className="h-4 w-4 text-terminal" />
            <span>
              git log --oneline --decorate --all
            </span>
            <span className="ml-auto text-terminal">{EXPERIENCE.length} commits</span>
          </div>

          <div className="relative p-6 sm:p-8">
            <div
              aria-hidden
              className="absolute bottom-8 left-[1.5rem] top-8 w-px bg-line sm:left-[2.15rem]"
            />
            <ol className="space-y-10">
              {EXPERIENCE.map((node, i) => (
                <motion.li
                  key={node.hash}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="relative pl-12 sm:pl-16"
                >
                  <span className="absolute left-[0.55rem] top-1 z-10 flex h-5 w-5 items-center justify-center sm:left-[1.2rem]">
                    <span
                      className={`h-2.5 w-2.5 rounded-full border-2 border-void ${
                        node.current ? "bg-terminal status-dot" : "bg-mist"
                      }`}
                    />
                  </span>

                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="rounded bg-terminal/10 px-1.5 py-0.5 font-semibold text-terminal">
                      {node.hash}
                    </span>
                    <span className="text-mist">({node.branch})</span>
                    <span className="text-mist">·</span>
                    <span className="text-ink">{node.date}</span>
                    {node.current && (
                      <span className="rounded border border-terminal px-1.5 py-0.5 text-[10px] text-terminal">
                        HEAD
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-mono text-base font-bold text-ink">
                    {node.role}
                  </h3>
                  <p className="mt-0.5 text-sm text-terminal-dim">{node.company}</p>

                  <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-mist">
                    {node.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-0.5 text-terminal">▸</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
