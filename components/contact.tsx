"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Send } from "lucide-react";
import { SITE } from "@/lib/data";
import { LinkedinIcon } from "./icons";
import SectionHeader from "./section-header";

function openMailto(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`[Portfolio] Contato de ${name}`);
  const body = encodeURIComponent(
    `Olá Matheus,\n\n${message}\n\n— ${name} (${email})`
  );
  window.open(`mailto:${SITE.email}?subject=${subject}&body=${body}`, "_self");
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setFormError("Informe um e-mail válido.");
      return;
    }
    setFormSent(true);
    openMailto(form.name, form.email, form.message);
  };

  const contactItems = [
    {
      label: "E-mail",
      value: SITE.email,
      href: `mailto:${SITE.email}`,
      icon: <Mail className="h-4 w-4" />,
    },
    {
      label: "LinkedIn",
      value: "in/matheus-zenz",
      href: SITE.socials.linkedin,
      icon: <LinkedinIcon className="h-4 w-4" />,
      external: true,
    },
    {
      label: "Localização",
      value: SITE.location,
      icon: <MapPin className="h-4 w-4" />,
    },
  ];

  return (
    <section id="contato" className="scroll-mt-16">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeader
          index="05"
          title="Contato"
          command="contact --info"
          description="Vamos conversar sobre oportunidades, projetos ou ideias. Escolha o canal que preferir ou envie uma mensagem pelo formulário."
        />

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-lg border border-line bg-panel p-6"
          >
            <div className="mb-5 flex items-center gap-2 border-b border-line pb-3 font-mono text-xs text-mist">
              <span className="status-dot h-2 w-2 rounded-full bg-terminal" />
              <span className="text-terminal">{SITE.status}</span>
            </div>

            <ul className="space-y-3">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded border border-line bg-void text-terminal">
                      {item.icon}
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-mist">
                        {item.label}
                      </span>
                      <span className="truncate text-sm text-ink">
                        {item.value}
                      </span>
                    </span>
                    {item.href && (
                      <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-mist transition-colors group-hover:text-terminal" />
                    )}
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? "_blank" : undefined}
                        rel={item.external ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-3 rounded border border-line bg-void p-3 transition-colors hover:border-terminal/40"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded border border-line bg-void p-3">
                        {content}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="rounded-lg border border-line bg-panel p-6 sm:p-8"
          >
            <h3 className="font-mono text-base font-bold text-ink">
              Envie uma mensagem
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-mist">
              Preencha os campos abaixo para abrir seu cliente de e-mail com a
              mensagem pronta.
            </p>

            <form onSubmit={handleFormSubmit} className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-mist">Nome</span>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  placeholder="Seu nome"
                  className="rounded border border-line bg-void px-3 py-2.5 font-mono text-sm text-ink outline-none transition-colors placeholder:text-mist/50 focus:border-terminal/60"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-mist">E-mail</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  placeholder="voce@empresa.com"
                  className="rounded border border-line bg-void px-3 py-2.5 font-mono text-sm text-ink outline-none transition-colors placeholder:text-mist/50 focus:border-terminal/60"
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="font-mono text-xs text-mist">Mensagem</span>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  placeholder="Descreva a oportunidade, projeto ou mensagem…"
                  className="resize-none rounded border border-line bg-void px-3 py-2.5 font-mono text-sm text-ink outline-none transition-colors placeholder:text-mist/50 focus:border-terminal/60"
                />
              </label>
              {formError && (
                <p className="font-mono text-xs text-red-400 sm:col-span-2">
                  <span className="text-red-400">✖</span> {formError}
                </p>
              )}
              <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
                <button
                  type="submit"
                  className="group flex items-center gap-2 rounded border border-terminal bg-terminal/10 px-5 py-2.5 font-mono text-sm font-semibold text-terminal transition-all hover:bg-terminal hover:text-void hover:shadow-[0_0_24px_rgba(0,255,102,0.35)]"
                >
                  <Send className="h-4 w-4" />
                  Enviar mensagem
                </button>
                {formSent && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="font-mono text-xs text-terminal"
                  >
                    ✔ mensagem pronta no seu e-mail
                  </motion.p>
                )}
              </div>
              <p className="font-mono text-[11px] text-mist sm:col-span-2">
                <Mail className="mr-1 inline h-3 w-3" />
                O formulário abre seu cliente de e-mail com a mensagem preenchida —
                nenhum dado é armazenado no site.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
