import { ArrowUp, Mail } from "lucide-react";
import { SITE } from "@/lib/data";
import DotArt from "./dot-art";
import { Hand } from "./sketch";
import { LinkedinIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <Hand className="text-2xl leading-none text-ink">
            obrigado por folhear.
          </Hand>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
            {SITE.name} © {new Date().getFullYear()} · feito com café, calma e
            pontinhos
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href={SITE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-sage-deeper"
          >
            <LinkedinIcon className="h-4 w-4" />
            linkedin
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-sage-deeper"
          >
            <Mail className="h-4 w-4" />
            e-mail
          </a>
          <a
            href="#capa"
            className="flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft transition-colors hover:border-sage-deep hover:text-sage-deeper"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            topo
          </a>
        </div>
      </div>

      <div className="relative h-44 overflow-hidden sm:h-56" aria-hidden>
        <DotArt variant="horizon" className="h-full w-full opacity-90" decorative />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-paper to-transparent" />
      </div>
    </footer>
  );
}
