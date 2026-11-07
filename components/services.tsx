"use client";

import { motion } from "framer-motion";
import { Boxes, CheckCircle2 } from "lucide-react";
import { SERVICES, SITE } from "@/lib/data";
import SectionHeader from "./section-header";

export default function Services() {
  return (
    <section id="competencias" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader
          index="03"
          title="Competências"
          command="system capabilities"
          description="Frentes em que atuo com profundidade: backend, arquitetura distribuída, IA aplicada e modernização de plataformas."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group relative flex flex-col rounded-lg border border-line bg-panel p-5 transition-colors hover:border-terminal/40"
            >
              <div className="mb-4 font-mono text-xs text-terminal-dim">
                <span className="text-terminal">&gt;_</span> {service.command}
              </div>
              <h3 className="font-mono text-base font-bold text-ink group-hover:text-terminal">
                {service.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-mist">
                {service.description}
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-mist">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-terminal" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-1.5 border-t border-line pt-3 font-mono text-[11px] text-mist">
                <Boxes className="h-3.5 w-3.5 text-terminal" />
                <span>stack principal</span>
                <span className="ml-auto text-terminal">{service.stack}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45 }}
          className="mt-6 flex flex-col items-center justify-between gap-3 rounded-lg border border-terminal/30 bg-terminal/5 px-5 py-4 font-mono text-xs sm:flex-row sm:text-sm"
        >
          <span className="flex items-center gap-2 text-terminal">
            <span className="status-dot h-2 w-2 rounded-full bg-terminal" />
            {SITE.status} — CLT ou PJ · remoto/híbrido
          </span>
          <span className="text-mist">
            base: <span className="text-ink">Curitiba/PR</span> · fuso{" "}
            <span className="text-ink">BRT ↔ UTC-3</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
