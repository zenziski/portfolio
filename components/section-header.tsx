"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  index: string;
  title: string;
  command?: string;
  description?: string;
}

export default function SectionHeader({
  index,
  title,
  command,
  description,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-10"
    >
      <div className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-mist">
        <span className="text-terminal">§ {index}</span>
        {command && <span className="hidden sm:inline text-terminal-dim">$ {command}</span>}
        <span className="h-px flex-1 bg-line" />
      </div>
      <h2 className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
        <span className="text-mist">&gt;</span> {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist">
          {description}
        </p>
      )}
    </motion.div>
  );
}
