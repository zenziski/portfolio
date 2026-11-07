"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare } from "lucide-react";
import { SITE } from "@/lib/data";

const BOOT_LINES = [
  "$ system init --profile=backend",
  "> kernel: matheus-portfolio v2.6.0 ........ ok",
  "> stack: node / typescript / python ....... ok",
  "> db: postgres / redis / kafka ............ ok",
  "> infra: azure / aws / gcp / k8s .......... ok",
  "> ai: llm / rag / agents .................. ok",
  "> status: ABERTO A OPORTUNIDADES",
];

export default function BootScreen() {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    const timer = setInterval(() => {
      if (lineIndex >= BOOT_LINES.length) {
        clearInterval(timer);
        setDone(true);
        return;
      }
      const current = BOOT_LINES[lineIndex];
      charIndex += 1;
      if (charIndex <= current.length) {
        setLines((prev) => [
          ...prev.slice(0, lineIndex),
          current.slice(0, charIndex),
        ]);
      } else {
        lineIndex += 1;
        charIndex = 0;
      }
    }, 10);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!done) return;
    const timeout = setTimeout(() => setVisible(false), 650);
    return () => clearTimeout(timeout);
  }, [done]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          data-boot-screen
          key="boot-screen"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-void px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          aria-label="Carregando o sistema"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,102,0.06),transparent_60%)]"
          />

          <div className="w-full max-w-2xl rounded-lg border border-line bg-panel p-5 font-mono text-xs leading-relaxed shadow-2xl shadow-black/60 sm:p-6 sm:text-sm">
            <div className="mb-4 flex items-center justify-between border-b border-line pb-3 text-mist">
              <span className="flex items-center gap-2">
                <TerminalSquare className="h-4 w-4 text-terminal" />
                system init
              </span>
              <span className="text-terminal">{SITE.version}</span>
            </div>

            <div className="space-y-1">
              {lines.length === 0 && !done && (
                <div>
                  <span className="animate-caret inline-block h-3 w-1.5 bg-terminal align-middle" />
                </div>
              )}
              {lines.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap text-terminal">
                  {line}
                  {i === lines.length - 1 && !done && (
                    <span className="animate-caret ml-0.5 inline-block h-3 w-1.5 bg-terminal align-middle" />
                  )}
                </div>
              ))}
            </div>

            {done && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 border-t border-line pt-3 text-terminal"
              >
                ✔ sistema pronto
              </motion.p>
            )}
          </div>

          <div aria-hidden className="scanlines" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
