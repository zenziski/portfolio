"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CornerDownLeft,
  FileCode2,
  GitCommitHorizontal,
  Mail,
  Package,
  Search,
  Server,
  Sparkles,
} from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/data";
import { LinkedinIcon } from "./icons";

type PaletteAction = {
  id: string;
  label: string;
  hint: string;
  group: string;
  icon: React.ReactNode;
  run: () => void;
};

export function openCommandPalette() {
  window.dispatchEvent(new Event("matheus:palette"));
}

const scrollToSection = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = useMemo<PaletteAction[]>(
    () => [
      ...NAV_ITEMS.map((item) => ({
        id: `nav-${item.key}`,
        label: `Ir para ${item.label}`,
        hint: `[${item.key}]`,
        group: "Navegação",
        icon: <FileCode2 className="h-4 w-4" />,
        run: () => scrollToSection(item.section),
      })),
      {
        id: "email",
        label: `Copiar e-mail (${SITE.email})`,
        hint: "mailto",
        group: "Ações",
        icon: <Mail className="h-4 w-4" />,
        run: () => navigator.clipboard?.writeText(SITE.email),
      },
      {
        id: "linkedin",
        label: "Abrir LinkedIn",
        hint: "in",
        group: "Ações",
        icon: <LinkedinIcon className="h-4 w-4" />,
        run: () => window.open(SITE.socials.linkedin, "_blank"),
      },
      {
        id: "status",
        label: "Ver status do sistema",
        hint: "info",
        group: "Ações",
        icon: <Server className="h-4 w-4" />,
        run: () => scrollToSection("contato"),
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) =>
      `${a.label} ${a.hint} ${a.group}`.toLowerCase().includes(q)
    );
  }, [actions, query]);

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      setQuery("");
      setActive(0);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleOpen();
      }
      if ((e.metaKey || e.ctrlKey) && /^[1-5]$/.test(e.key)) {
        const item = NAV_ITEMS[Number(e.key) - 1];
        if (item) scrollToSection(item.section);
      }
    };
    const onPalette = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("matheus:palette", onPalette);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("matheus:palette", onPalette);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % Math.max(filtered.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    } else if (e.key === "Enter") {
      const action = filtered[active];
      if (action) {
        setOpen(false);
        action.run();
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            className="relative w-full max-w-xl overflow-hidden rounded-lg border border-line-strong bg-panel shadow-2xl shadow-black/60"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-mono text-xs text-mist">
              <Search className="h-4 w-4 text-terminal" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Digite um comando ou seção…"
                className="flex-1 bg-transparent text-ink outline-none placeholder:text-mist/60"
                aria-label="Buscar comando"
              />
              <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] text-mist">
                esc
              </kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-3 py-6 text-center font-mono text-sm text-mist">
                  <Sparkles className="mx-auto mb-2 h-5 w-5" />
                  Nenhum comando encontrado para &quot;{query}&quot;
                </div>
              )}
              {filtered.map((action, i) => (
                <button
                  key={action.id}
                  onClick={() => {
                    setOpen(false);
                    action.run();
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm ${
                    i === active ? "bg-line" : "bg-transparent"
                  }`}
                >
                  <span className="text-terminal">{action.icon}</span>
                  <span className="flex-1 text-ink">{action.label}</span>
                  <span className="font-mono text-[10px] uppercase text-mist">
                    {action.hint}
                  </span>
                  {i === active && (
                    <CornerDownLeft className="h-3.5 w-3.5 text-terminal" />
                  )}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3 border-t border-line px-4 py-2 font-mono text-[10px] text-mist">
              <span className="flex items-center gap-1">
                <GitCommitHorizontal className="h-3 w-3" /> {SITE.version}
              </span>
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" /> {filtered.length} comandos
              </span>
              <span className="ml-auto">↑↓ navegar · ↵ executar</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
