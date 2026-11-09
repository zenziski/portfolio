"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { PROFILE, SITE } from "@/lib/data";
import DotArt from "./dot-art";
import {
  DoodleArrow,
  DoodleCompass,
  DoodleLeaf,
  DoodleStar,
} from "./doodles";
import { Hand, Sticker, Tape } from "./sketch";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.08,
        delayChildren: reduce ? 0 : 0.08,
      },
    },
  };

  const item: Variants = reduce
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" },
        },
      };

  return (
    <section id="capa" className="relative overflow-hidden scroll-mt-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
      >
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-sage/20 blur-3xl" />
        <div className="absolute -right-16 top-40 h-72 w-72 rounded-full bg-sky/25 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 dot-paper opacity-40" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:grid-cols-[1.06fr_0.94fr] lg:gap-10 lg:pb-24 lg:pt-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
              {PROFILE.eyebrow}
            </span>
            <span className="flex-1" />
            <Sticker tint="sky" className="rotate-2">
              <MapPin className="h-3 w-3" />
              {SITE.location}
            </Sticker>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-[3.25rem] leading-[0.88] tracking-tight text-ink sm:text-7xl lg:text-[5.5rem]"
          >
            Matheus
            <br />
            <span className="italic text-sage-deeper">Zenziski</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-md font-hand text-2xl leading-snug text-ink-soft sm:text-[1.7rem]"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-sm leading-relaxed text-ink-soft sm:text-[0.95rem]"
          >
            {PROFILE.shortIntro}
          </motion.p>

          <motion.div variants={item} className="mt-6 flex flex-wrap gap-2">
            {["backend", "IA aplicada", "arquitetura distribuída"].map((tag, i) => (
              <Sticker key={tag} tint={i === 1 ? "mint" : i === 2 ? "sky" : "sage"}>
                {tag}
              </Sticker>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("profissional")}
              className="group inline-flex items-center gap-2 rounded-sm border border-ink/15 bg-ink px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-paper transition-transform hover:-translate-y-0.5"
            >
              folhear o trabalho
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("pessoal")}
              className="group inline-flex items-center gap-2 rounded-sm border border-line-strong bg-paper/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors hover:border-sage-deep/60 hover:text-sage-deeper"
            >
              lado pessoal
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex items-center gap-3 border-t border-dashed border-line pt-5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sage-deep/40 bg-mint">
              <span className="h-2 w-2 rounded-full bg-sage-deep animate-breathe" />
            </span>
            <div>
              <p className="font-hand text-lg leading-none text-sage-deeper">
                {PROFILE.availability}
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                {SITE.focus}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full min-w-0 max-w-md lg:max-w-none"
        >
          <motion.div
            variants={item}
            aria-hidden
            className="absolute inset-x-5 top-6 -z-10 h-full rotate-[-3deg] rounded-sm border border-line bg-sky-soft/60 paper-shadow-soft"
          />

          <motion.div variants={item} className="relative">
            <div
              className="animate-float"
              style={{ "--tilt": "1.5deg" } as React.CSSProperties}
            >
              <div className="relative rotate-[1.5deg] rounded-sm border border-line bg-paper p-3 pb-5 paper-shadow sm:p-4 sm:pb-6">
                <Tape className="-top-3 left-8 -rotate-6" tint="sage" />
                <Tape className="-right-4 top-24 rotate-[78deg]" tint="sky" />
                <div className="overflow-hidden rounded-sm border border-line/70 bg-sky-soft/40">
                  <DotArt
                    variant="globe"
                    className="aspect-square w-full"
                    decorative
                  />
                </div>
                <div className="mt-3 flex items-end justify-between gap-3 px-1">
                  <Hand className="text-lg leading-none text-ink-soft">
                    o mundo em pontinhos
                  </Hand>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink-faint">
                    estudo #01
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              variants={item}
              className="absolute -bottom-8 -left-4 max-w-[11.5rem]"
            >
              <div
                className="animate-sway relative border border-line bg-sticky px-4 py-3 paper-shadow-soft"
                style={{ "--tilt": "-4deg" } as React.CSSProperties}
              >
                <span
                  aria-hidden
                  className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-ink/20 bg-sage-deep/70"
                />
                <Hand className="block text-lg leading-tight text-ink">
                  disponível para novos projetos
                </Hand>
                <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-ink-soft">
                  {SITE.timezone} · remoto
                </span>
              </div>
            </motion.div>

            <DoodleArrow
              className="absolute -right-2 bottom-16 h-10 w-14 rotate-[-18deg] text-sky-deep/70"
            />
            <DoodleCompass className="absolute -right-5 top-10 h-9 w-9 rotate-12 text-sage-deep/70 animate-drift" />
            <DoodleStar className="absolute -left-5 top-4 h-7 w-7 text-sky-deep/70" />
            <DoodleLeaf className="absolute -bottom-6 right-4 h-10 w-8 rotate-12 text-sage-deep/60" />
          </motion.div>
        </motion.div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 pb-10 sm:px-6">
        <span className="h-px flex-1 bg-line-strong/50" />
        <button
          type="button"
          onClick={() => onNavigate("profissional")}
          className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-faint transition-colors hover:text-sage-deeper"
        >
          role a página
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </button>
        <span className="h-px flex-1 bg-line-strong/50" />
      </div>
    </section>
  );
}
