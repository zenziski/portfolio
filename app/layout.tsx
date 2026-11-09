import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matheus Zenziski — Caderno de campo",
  description:
    "O caderno de um engenheiro de software: anotações, projetos de backend e IA, desenhos em pontilhismo e as coisas que me interessam fora do terminal.",
  keywords: [
    "matheus zenziski",
    "portfólio",
    "engenheiro de software",
    "backend",
    "node.js",
    "typescript",
    "python",
    "llm",
    "caderno de campo",
    "sketchbook",
  ],
  authors: [{ name: "Matheus Zenziski" }],
  openGraph: {
    title: "Matheus Zenziski — Caderno de campo",
    description:
      "Anotações, projetos, pontilhismo e coisas que me interessam. O caderno de um engenheiro de software.",
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f6ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-dvh bg-paper font-sans text-ink">
        {children}
      </body>
    </html>
  );
}
