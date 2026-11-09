"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, SITE } from "@/lib/data";
import { DoodlePin, DoodleStar } from "./doodles";
import { SectionLabel, SquiggleDivider, StickyNote } from "./sketch";

const STICKY_TINT = {
  sticky: "sticky",
  sage: "sage",
  sky: "blue",
  mint: "sage",
} as const;

const TILTS = [-2.2, 1.6, -1.4, 2.1];

interface ServicesProps {
  onContact: () => void;
}

export default function Services({ onContact }: ServicesProps) {
  const reduce = useReducedMotion();

  return (
    <section id="servicos" className="scroll-mt-24">
      <SectionLabel meta="4 frentes" accent="sky">
        como eu posso ajudar
      </SectionLabel>
      <p className="mt-4 max-w-xl font-hand text-xl leading-snug text-ink-soft">
        do desenho da arquitetura ao deploy — e depois, cuidando para que tudo
        continue de pé.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (index % 4) * 0.06 }}
            className="h-full"
          >
            <StickyNote
              tint={STICKY_TINT[service.tint]}
              tilt={TILTS[index % TILTS.length]}
              className="flex h-full min-h-[17rem] flex-col p-5 pt-7"
            >
              <DoodlePin className="absolute -top-3 left-1/2 h-6 w-5 -translate-x-1/2 text-ink/50" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint">
                0{index + 1}
              </span>
              <h3 className="mt-2 font-display text-xl leading-tight text-ink">
                {service.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                {service.description}
              </p>
              <ul className="mt-4 space-y-1.5">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 font-mono text-[10px] leading-relaxed text-ink-soft"
                  >
                    <DoodleStar className="mt-0.5 h-2.5 w-2.5 shrink-0 text-sage-deeper" />
                    {item}
                  </li>
                ))}
              </ul>
            </StickyNote>
          </motion.div>
        ))}
      </div>

      <SquiggleDivider className="my-12" />

      <div className="flex flex-col items-start justify-between gap-5 rounded-sm border border-line bg-paper-2/60 px-5 py-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sage-deep/40 bg-mint">
            <span className="h-2.5 w-2.5 rounded-full bg-sage-deep animate-breathe" />
          </span>
          <div>
            <p className="font-hand text-xl leading-none text-sage-deeper">
              {SITE.status}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
              remoto · {SITE.timezone} · CLT ou PJ
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onContact}
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink transition-colors hover:text-sage-deeper"
        >
          me manda uma mensagem
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </section>
  );
}
