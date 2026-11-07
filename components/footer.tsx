import { Mail } from "lucide-react";
import { SITE } from "@/lib/data";
import { LinkedinIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-panel">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 font-mono text-xs text-mist sm:flex-row sm:items-center sm:px-6">
        <span className="flex items-center gap-2">
          <span className="text-terminal">[exit]</span>
          Matheus Zenziski © {new Date().getFullYear()} — conexão segura
        </span>
        <span className="sm:ml-auto flex items-center gap-4">
          <span className="hidden sm:inline text-terminal-dim">{SITE.version}</span>
          {[
            { href: SITE.socials.linkedin, label: "LinkedIn", icon: <LinkedinIcon className="h-4 w-4" /> },
            { href: `mailto:${SITE.email}`, label: "Email", icon: <Mail className="h-4 w-4" /> },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") || s.href.startsWith("tel") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-mist transition-colors hover:text-terminal"
            >
              {s.icon}
              <span className="hidden sm:inline">{s.label}</span>
            </a>
          ))}
        </span>
      </div>
    </footer>
  );
}
