"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STACK_GROUPS } from "@/lib/data";
import { DoodleStar } from "./doodles";
import { Hand, PaperCard, SectionLabel, Tape } from "./sketch";

const TILTS = [-0.7, 0.6, -0.5, 0.8, -0.4, 0.5];
const CHIP_TILTS = [-1.5, 1.2, -0.8, 1.6, -1.2, 0.9];

export default function Stack() {
  const reduce = useReducedMotion();

  return (
    <section id="ferramentas" className="scroll-mt-24">
      <SectionLabel meta="stacks & práticas">a caixa de ferramentas</SectionLabel>
      <p className="mt-4 max-w-xl font-hand text-xl leading-snug text-ink-soft">
        o que eu uso no dia a dia — e o jeito como gosto de trabalhar.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STACK_GROUPS.map((group, index) => (
          <motion.div
            key={group.label}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: (index % 3) * 0.06 }}
          >
            <div style={{ transform: `rotate(${TILTS[index % TILTS.length]}deg)` }}>
            <PaperCard className="h-full p-5" dotted>
              <Tape
                className="-top-2.5 right-6 h-5 w-16"
                tint={index % 3 === 0 ? "sage" : index % 3 === 1 ? "sky" : "cream"}
                tilt={index % 2 ? 4 : -4}
              />
              <div className="flex items-center justify-between gap-2">
                <Hand className="text-xl leading-none text-ink">{group.label}</Hand>
                <DoodleStar className="h-3.5 w-3.5 text-sage-deep/60" />
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item, chipIndex) => (
                  <span
                    key={item}
                    className={[
                      "inline-flex items-center rounded-full border border-line-strong px-2.5 py-1 font-mono text-[11px] text-ink-soft",
                      group.tint === "sky"
                        ? "bg-sky-soft"
                        : group.tint === "mint"
                          ? "bg-mint"
                          : "bg-[#e6eedd]",
                    ].join(" ")}
                    style={{
                      transform: `rotate(${
                        CHIP_TILTS[(index + chipIndex) % CHIP_TILTS.length]
                      }deg)`,
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </PaperCard>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
        <span className="h-px w-6 bg-line-strong" />
        a lista muda sempre — aprender faz parte do trabalho.
      </p>
    </section>
  );
}
