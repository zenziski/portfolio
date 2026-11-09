"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { SITE } from "@/lib/data";
import { DoodleStar } from "./doodles";
import { LinkedinIcon } from "./icons";
import { Hand, PaperCard, SectionLabel, Tape } from "./sketch";

function openMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`[Portfolio] oi, ${name}`);
  const body = encodeURIComponent(
    `Olá Matheus,\n\n${message}\n\n— ${name} (${email})`
  );
  window.open(`mailto:${SITE.email}?subject=${subject}&body=${body}`, "_self");
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("confere o e-mail, por favor.");
      return;
    }
    setSent(true);
    openMailto(form.name, form.email, form.message);
  };

  const contacts = [
    {
      label: "e-mail",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      icon: <Mail className="h-4 w-4" />,
      external: false,
    },
    {
      label: "linkedin",
      value: "in/matheus-zenz",
      href: SITE.socials.linkedin,
      icon: <LinkedinIcon className="h-4 w-4" />,
      external: true,
    },
    {
      label: "onde estou",
      value: `${SITE.location} · ${SITE.timezone}`,
      href: null,
      icon: <MapPin className="h-4 w-4" />,
      external: false,
    },
  ];

  return (
    <section id="contato" className="scroll-mt-16">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-faint">
            contato
          </span>
          <h2 className="mt-3 font-display text-4xl leading-[0.95] text-ink sm:text-6xl">
            Vamos <em className="italic text-sage-deeper">conversar</em>?
          </h2>
          <p className="mx-auto mt-3 max-w-md font-hand text-xl leading-snug text-ink-soft">
            projetos, ideias, uma vaga, ou só uma recomendação de livro. eu
            respondo.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            <PaperCard className="relative overflow-hidden p-6">
              <Tape className="-top-3 right-8 h-6 w-20" tint="sky" tilt={4} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Hand className="text-xl leading-none text-ink">
                    um café, talvez?
                  </Hand>
                  <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                    Estou aberto a conversas sobre backend, IA e produto —
                    freelance, CLT ou só uma troca de ideia.
                  </p>
                </div>
                <span className="stamp-edge flex h-14 w-12 shrink-0 flex-col items-center justify-center border border-sky-deep/40 bg-sky-soft font-mono text-[8px] uppercase leading-tight tracking-[0.1em] text-sky-deep">
                  <span className="font-display text-base not-italic">MZ</span>
                  BR
                </span>
              </div>

              <ul className="mt-6 space-y-2.5">
                {contacts.map((contact) => {
                  const inner = (
                    <>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-paper-2 text-sage-deeper">
                        {contact.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">
                          {contact.label}
                        </span>
                        <span className="block truncate text-sm text-ink">
                          {contact.value}
                        </span>
                      </span>
                      {contact.href && (
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-faint transition-colors group-hover:text-sage-deeper" />
                      )}
                    </>
                  );

                  return (
                    <li key={contact.label}>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          target={contact.external ? "_blank" : undefined}
                          rel={
                            contact.external ? "noopener noreferrer" : undefined
                          }
                          className="group flex items-center gap-3 border-b border-dashed border-line pb-2.5 transition-colors last:border-0"
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-3">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </PaperCard>

            <div className="rotate-[-1.2deg] border border-line bg-mint px-5 py-4 paper-shadow-soft">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sage-deep animate-breathe" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-sage-deeper">
                  {SITE.status}
                </span>
              </div>
              <p className="mt-1.5 font-hand text-lg leading-snug text-ink-soft">
                respondo em até um dia útil — geralmente bem antes.
              </p>
            </div>
          </div>

          <PaperCard ruled className="relative p-6 sm:p-8">
            <Tape className="-top-3 left-10 h-6 w-24" tint="sage" tilt={-3} />
            <SectionLabel meta="nada é armazenado">me manda uma carta</SectionLabel>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    seu nome
                  </span>
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    required
                    placeholder="como te chamo?"
                    className="mt-1 w-full border-b border-line-strong bg-transparent pb-2 font-hand text-xl text-ink placeholder:text-ink-faint/70 focus:border-sage-deep focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                    seu e-mail
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm({ ...form, email: event.target.value })
                    }
                    required
                    placeholder="voce@lugar.com"
                    className="mt-1 w-full border-b border-line-strong bg-transparent pb-2 font-mono text-sm text-ink placeholder:text-ink-faint/70 focus:border-sage-deep focus:outline-none"
                  />
                </label>
              </div>

              <label className="block">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">
                  a mensagem
                </span>
                <textarea
                  value={form.message}
                  onChange={(event) =>
                    setForm({ ...form, message: event.target.value })
                  }
                  required
                  rows={5}
                  placeholder="me conta o que você tem em mente…"
                  className="mt-1 w-full resize-none border-b border-line-strong bg-transparent pb-2 font-hand text-xl leading-snug text-ink placeholder:text-ink-faint/70 focus:border-sage-deep focus:outline-none"
                />
              </label>

              {error && (
                <p className="flex items-center gap-1.5 font-mono text-[11px] text-sky-deep">
                  <DoodleStar className="h-3 w-3" />
                  {error}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 rounded-sm border border-ink/15 bg-ink px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-paper transition-transform hover:-translate-y-0.5"
                >
                  enviar carta
                  <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-hand text-lg text-sage-deeper"
                  >
                    mensagem pronta no seu e-mail.
                  </motion.p>
                )}
              </div>

              <p className="font-mono text-[10px] leading-relaxed text-ink-faint">
                o formulário abre seu cliente de e-mail com tudo preenchido.
                nenhum dado passa por este site.
              </p>
            </form>
          </PaperCard>
        </div>
      </div>
    </section>
  );
}
