"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Clapperboard,
  Gamepad2,
  Music2,
  type LucideIcon,
} from "lucide-react";
import {
  BOOKS,
  FILMS,
  GAMES,
  HOBBIES,
  MANIFESTO,
  MUSIC,
  NOW,
  type NowItem,
} from "@/lib/data";
import DotArt, { type DotVariant } from "./dot-art";
import {
  DoodleCompass,
  DoodleHeart,
  DoodleLeaf,
  DoodleSquiggle,
  DoodleStar,
} from "./doodles";
import {
  ChapterHeading,
  Hand,
  PaperCard,
  SectionLabel,
  SquiggleDivider,
  StickyNote,
  Tape,
} from "./sketch";

const NOW_TINT: Record<NowItem["tint"], "sticky" | "blue" | "sage"> = {
  sage: "sage",
  sky: "blue",
  sticky: "sticky",
  mint: "sage",
};

const NOW_TILTS = [-2.8, 2.4, -2.2, 2.8, -2.4, 2];

type ShelfId = "filmes" | "livros" | "jogos" | "musicas";

interface ShelfItem {
  title: string;
  meta: string;
  note: string;
}

interface ShelfTab {
  id: ShelfId;
  label: string;
  icon: LucideIcon;
  items: ShelfItem[];
}

const SHELF: ShelfTab[] = [
  {
    id: "filmes",
    label: "filmes",
    icon: Clapperboard,
    items: FILMS.map((film) => ({
      title: film.title,
      meta: film.year,
      note: film.note,
    })),
  },
  {
    id: "livros",
    label: "livros",
    icon: BookOpen,
    items: BOOKS.map((book) => ({
      title: book.title,
      meta: book.author,
      note: book.note,
    })),
  },
  {
    id: "jogos",
    label: "jogos",
    icon: Gamepad2,
    items: GAMES.map((game) => ({
      title: game.title,
      meta: game.year,
      note: game.note,
    })),
  },
  {
    id: "musicas",
    label: "música",
    icon: Music2,
    items: MUSIC.map((music) => ({
      title: music.artist,
      meta: "artista",
      note: music.note,
    })),
  },
];

const STUDIES: { variant: DotVariant; caption: string; label: string; tilt: number }[] = [
  {
    variant: "ridge",
    caption: "montanhas que ainda quero subir",
    label: "estudo #03",
    tilt: -1.4,
  },
  {
    variant: "horizon",
    caption: "o horizonte, sempre o horizonte",
    label: "estudo #04",
    tilt: 1.2,
  },
  {
    variant: "wave",
    caption: "mar calmo em dias de deploy",
    label: "estudo #05",
    tilt: -0.8,
  },
];

export default function Personal() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<ShelfId>("filmes");
  const activeTab = SHELF.find((item) => item.id === tab) ?? SHELF[0];

  return (
    <section id="pessoal" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <ChapterHeading
          index="dois"
          kicker="fora do terminal"
          title={
            <>
              O que me move quando o{" "}
              <em className="italic text-sky-deep">laptop fecha</em>.
            </>
          }
          note="gostos, hobbies e pequenas obsessões"
          accent="sky"
        />

        <div className="space-y-16 sm:space-y-20">
          <div>
            <SectionLabel accent="sky" meta="atualizado sempre que dá">
              no momento
            </SectionLabel>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {NOW.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
                >
                  <StickyNote
                    tint={NOW_TINT[item.tint]}
                    tilt={NOW_TILTS[index % NOW_TILTS.length]}
                    className="h-full p-4"
                  >
                    <Tape
                      className="-top-2 left-6 h-4 w-12"
                      tint={index % 2 ? "sky" : "sage"}
                      tilt={index % 2 ? 5 : -5}
                    />
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-faint">
                      {item.label}
                    </p>
                    <p className="mt-1.5 font-display text-lg leading-tight text-ink">
                      {item.value}
                    </p>
                    <p className="mt-1 font-hand text-base leading-tight text-ink-soft">
                      {item.detail}
                    </p>
                  </StickyNote>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel accent="sky" meta={`${activeTab.items.length} favoritos`}>
              a prateleira
            </SectionLabel>
            <div className="mt-5 flex items-end justify-between gap-4">
              <div
                className="no-scrollbar flex gap-1 overflow-x-auto"
                role="tablist"
                aria-label="Categorias da prateleira"
              >
                {SHELF.map((item) => {
                  const Icon = item.icon;
                  const active = item.id === tab;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setTab(item.id)}
                      className={[
                        "flex items-center gap-1.5 whitespace-nowrap rounded-t-md border border-b-0 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                        active
                          ? "border-line-strong bg-paper text-sage-deeper"
                          : "border-transparent bg-transparent text-ink-faint hover:text-sky-deep",
                      ].join(" ")}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
              <Hand className="hidden shrink-0 text-lg text-ink-faint sm:block">
                clique para folhear
              </Hand>
            </div>

            <div className="border-t border-line pt-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                >
                  {activeTab.items.map((item, index) => (
                    <div
                      key={item.title}
                      style={{
                        transform: `rotate(${index % 2 ? 0.8 : -0.8}deg)`,
                      }}
                    >
                      <PaperCard className="h-full p-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-faint">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <DoodleStar className="h-3 w-3 text-sage-deep/50" />
                        </div>
                        <h3 className="mt-2 font-display text-lg leading-tight text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-sky-deep">
                          {item.meta}
                        </p>
                        <p className="mt-2 font-hand text-base leading-snug text-ink-soft">
                          {item.note}
                        </p>
                      </PaperCard>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div>
            <SectionLabel accent="sky" meta="feitos com paciência">
              estudos em pontilhismo
            </SectionLabel>
            <p className="mt-4 max-w-xl font-hand text-xl leading-snug text-ink-soft">
              desenhar em pontos é o oposto de otimizar latência. e é por isso
              que eu gosto.
            </p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {STUDIES.map((study, index) => (
                <motion.figure
                  key={study.label}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                >
                  <div
                    style={{ transform: `rotate(${study.tilt}deg)` }}
                    className="relative border border-line bg-paper p-3 paper-shadow"
                  >
                    <Tape
                      className="-top-2.5 left-1/2 h-5 w-20 -translate-x-1/2"
                      tint={index % 2 ? "sky" : "sage"}
                      tilt={index % 2 ? 3 : -3}
                    />
                    <div className="overflow-hidden rounded-sm border border-line/70 bg-sky-soft/30">
                      <DotArt
                        variant={study.variant}
                        className="h-44 w-full"
                        decorative
                      />
                    </div>
                  </div>
                  <figcaption className="mt-3 flex items-end justify-between gap-2 px-1">
                    <Hand className="text-base leading-tight text-ink-soft">
                      {study.caption}
                    </Hand>
                    <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-ink-faint">
                      {study.label}
                    </span>
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel accent="sky" meta={`${HOBBIES.length} obsessões`}>
              fora da tela
            </SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {HOBBIES.map((hobby, index) => (
                <div
                  key={hobby.title}
                  className={[
                    "paper-shadow-soft border border-line px-3.5 py-2.5 transition-transform hover:-translate-y-0.5",
                    index % 3 === 0
                      ? "bg-mint"
                      : index % 3 === 1
                        ? "bg-sky-soft"
                        : "bg-sticky",
                  ].join(" ")}
                  style={{
                    transform: `rotate(${
                      [-2.4, 1.8, -2, 2.6, -2.2, 1.6, -2.6, 2.2][index % 8]
                    }deg)`,
                  }}
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                    {hobby.title}
                  </p>
                  <p className="mt-0.5 font-hand text-base leading-tight text-ink-soft">
                    {hobby.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <DoodleSquiggle className="mx-auto mb-8 h-5 w-36 text-sage-deep/50" />
            <div className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
              <PaperCard ruled className="p-6 sm:p-8">
                <SectionLabel accent="sage">coisas que eu acredito</SectionLabel>
                <ul className="mt-5 space-y-3">
                  {MANIFESTO.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-2.5 font-hand text-xl leading-snug text-ink"
                    >
                      <DoodleHeart className="mt-1.5 h-3.5 w-3.5 shrink-0 text-sky-deep/70" />
                      {line}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-end justify-between border-t border-dashed border-line pt-4">
                  <Hand className="text-lg text-ink-faint">
                    — anotado em algum caderno
                  </Hand>
                  <span className="font-display text-2xl italic text-sage-deeper">
                    M.
                  </span>
                </div>
              </PaperCard>

              <div className="flex flex-col gap-4">
                <div className="rotate-[1.5deg] border border-line bg-paper p-3 paper-shadow-soft">
                  <div className="overflow-hidden rounded-sm border border-line/70 bg-sky-soft/30">
                    <DotArt variant="globe" className="aspect-square w-full" decorative />
                  </div>
                  <div className="mt-2 flex items-center justify-between px-1">
                    <Hand className="text-base text-ink-soft">o mundo, de novo</Hand>
                    <DoodleCompass className="h-4 w-4 text-sage-deep/60" />
                  </div>
                </div>
                <div className="-rotate-[1deg] border border-line bg-sticky px-5 py-4 paper-shadow-soft">
                  <Hand className="text-lg leading-snug text-ink">
                    se você chegou até aqui, provavelmente a gente se daria bem.
                  </Hand>
                  <DoodleLeaf className="ml-auto mt-2 h-6 w-5 text-sage-deep/60" />
                </div>
              </div>
            </div>
            <SquiggleDivider className="mt-12" accent="sky" />
          </div>
        </div>
      </div>
    </section>
  );
}
