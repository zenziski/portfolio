"use client";

import { motion } from "framer-motion";
import { GraduationCap, Languages } from "lucide-react";
import { EDUCATION, LANGUAGES } from "@/lib/data";
import SectionHeader from "./section-header";

export default function Education() {
  return (
    <section id="formacao" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader
          index="04"
          title="Formação"
          command="cat formacao.json"
          description="Base acadêmica em engenharia e arquitetura de soluções, complementada por atuação prática em sistemas distribuídos."
        />

        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="overflow-hidden rounded-lg border border-line bg-panel"
          >
            <div className="flex items-center gap-4 border-b border-line bg-panel-2 px-4 py-2.5 font-mono text-[11px] text-mist">
              <GraduationCap className="h-4 w-4 text-terminal" />
              <span>cat formacao.json</span>
              <span className="ml-auto text-terminal">
                {EDUCATION.length} registros
              </span>
            </div>

            <ol className="divide-y divide-line">
              {EDUCATION.map((entry, i) => (
                <motion.li
                  key={entry.institution}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="rounded bg-terminal/10 px-1.5 py-0.5 font-semibold text-terminal">
                      edu-{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-mist">·</span>
                    <span className="text-ink">{entry.period}</span>
                  </div>

                  <h3 className="mt-3 font-mono text-base font-bold text-ink">
                    {entry.degree}
                  </h3>
                  <p className="mt-0.5 text-sm text-terminal-dim">
                    {entry.institution}
                  </p>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="rounded-lg border border-line bg-panel p-5"
          >
            <div className="mb-4 flex items-center gap-2 border-b border-line pb-3 font-mono text-xs text-mist">
              <Languages className="h-4 w-4 text-terminal" />
              idiomas
            </div>

            <ul className="space-y-3">
              {LANGUAGES.map((entry) => (
                <li
                  key={entry.language}
                  className="flex items-center justify-between gap-3 font-mono text-sm"
                >
                  <span className="text-ink">{entry.language}</span>
                  <span className="text-right text-[11px] text-terminal">
                    {entry.level}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
