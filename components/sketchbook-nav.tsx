"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE, type Area } from "@/lib/data";
import { Hand } from "./sketch";

interface SketchbookNavProps {
  area: Area;
  onNavigate: (id: string) => void;
}

type Section = "capa" | "capitulo" | "contato";

export default function SketchbookNav({ area, onNavigate }: SketchbookNavProps) {
  const [section, setSection] = useState<Section>("capa");

  useEffect(() => {
    const update = () => {
      const y = window.scrollY + 140;
      const contact = document.getElementById("contato");
      const chapter = document.getElementById("capitulo");
      const contactTop = contact
        ? contact.getBoundingClientRect().top + window.scrollY
        : Infinity;
      const chapterTop = chapter
        ? chapter.getBoundingClientRect().top + window.scrollY
        : Infinity;

      if (y >= contactTop) setSection("contato");
      else if (y >= chapterTop - 40) setSection("capitulo");
      else setSection("capa");
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [area]);

  const isActive = (id: string) => {
    if (id === "capa") return section === "capa";
    if (id === "contato") return section === "contato";
    if (id === "profissional" || id === "pessoal") {
      return section === "capitulo" && area === id;
    }
    return false;
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-4 sm:px-6">
          <button
            type="button"
            onClick={() => onNavigate("capa")}
            className="group flex shrink-0 items-center gap-2.5"
            aria-label="Voltar para a capa"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sage-deep/40 bg-mint font-display text-sm font-semibold text-sage-deeper transition-transform group-hover:-rotate-6">
              MZ
            </span>
            <span className="hidden flex-col text-left leading-none sm:flex">
              <span className="font-display text-sm font-medium text-ink">
                {SITE.name}
              </span>
              <Hand className="mt-0.5 text-sm text-sage-deeper">
                caderno de campo
              </Hand>
            </span>
          </button>

          <nav
            className="no-scrollbar ml-auto flex items-center gap-0.5 overflow-x-auto"
            aria-label="Seções do caderno"
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(item.id)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "relative whitespace-nowrap rounded-t-md px-2.5 py-2 font-mono text-[11px] transition-colors sm:px-3 sm:text-xs",
                    active
                      ? "bg-paper-2 text-ink"
                      : "text-ink-soft hover:text-sage-deeper",
                  ].join(" ")}
                >
                  {item.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-sage-deep"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="ml-2 hidden shrink-0 items-center gap-2 border-l border-line pl-3 lg:flex">
            <span className="h-2 w-2 rounded-full bg-sage-deep animate-breathe" />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
              {SITE.status}
            </span>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />
    </header>
  );
}
