"use client";

import { useEffect, useState } from "react";
import { Command, Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/data";
import { openCommandPalette } from "./command-palette";

const BOOT_TIME = Date.now();

function fmtClock(tz: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function fmtUptime(now: number) {
  const s = Math.floor((now - BOOT_TIME) / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m`;
}

export default function StatusBar() {
  const [now, setNow] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 font-mono text-sm">
          <span className="text-terminal">matheus@portfolio</span>
          <span className="text-mist">:~$</span>
          <span className="animate-caret inline-block h-4 w-2 bg-terminal" />
        </a>

        <div className="ml-auto hidden items-center gap-4 font-mono text-[11px] text-mist md:flex">
          <span className="flex items-center gap-2">
            <span className="status-dot h-2 w-2 rounded-full bg-terminal" />
            <span className="text-terminal">{SITE.status}</span>
          </span>
          <span className="hidden xl:block">
            BRT <span className="text-ink">{now ? fmtClock("America/Sao_Paulo") : "--:--:--"}</span>
          </span>
          <span className="hidden xl:block">
            UTC <span className="text-ink">{now ? fmtClock("UTC") : "--:--:--"}</span>
          </span>
          <span>
            uptime <span className="text-ink">{now ? fmtUptime(now) : "…"}</span>
          </span>
          <span className="text-terminal">{SITE.version}</span>
        </div>

        <nav className="ml-auto hidden items-center gap-1 font-mono text-xs xl:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded px-2 py-1 text-mist transition-colors hover:bg-line hover:text-terminal"
            >
              <span className="text-terminal-dim">[{item.key}]</span> {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={openCommandPalette}
          className="ml-auto flex items-center gap-1.5 rounded border border-line px-2 py-1 font-mono text-[11px] text-mist transition-colors hover:border-terminal/40 hover:text-terminal lg:ml-2"
          aria-label="Abrir paleta de comandos"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Ctrl K</span>
        </button>

        <button
          type="button"
          className="text-mist xl:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Alternar menu"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-panel px-4 py-3 xl:hidden">
          <div className="mb-3 flex flex-wrap gap-3 font-mono text-[11px] text-mist">
            <span className="flex items-center gap-2">
              <span className="status-dot h-2 w-2 rounded-full bg-terminal" />
              <span className="text-terminal">{SITE.status}</span>
            </span>
            <span>
              BRT{" "}
              <span className="text-ink">
                {now ? fmtClock("America/Sao_Paulo") : "--:--:--"}
              </span>
            </span>
            <span>
              uptime <span className="text-ink">{now ? fmtUptime(now) : "…"}</span>
            </span>
          </div>
          <nav className="flex flex-col gap-1 font-mono text-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded px-2 py-2 text-mist transition-colors hover:bg-line hover:text-terminal"
              >
                <span className="text-terminal-dim">[{item.key}]</span> {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
