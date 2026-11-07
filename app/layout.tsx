import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matheus Zenziski — Engenheiro Backend Sênior",
  description:
    "Engenheiro Backend Sênior com 6+ anos em arquiteturas distribuídas cloud-native e sistemas de IA. Node.js, TypeScript, Python, LLM, Kafka, Kubernetes e Azure/AWS/GCP.",
  keywords: [
    "engenheiro backend",
    "backend engineer",
    "node.js",
    "typescript",
    "python",
    "llm",
    "rag",
    "microsserviços",
    "kubernetes",
    "azure",
    "aws",
    "gcp",
    "fintech",
    "saas",
  ],
  authors: [{ name: "Matheus Zenziski" }],
  openGraph: {
    title: "Matheus Zenziski — Engenheiro Backend Sênior",
    description:
      "Arquiteturas distribuídas, sistemas de IA e cloud em produção. Aberto a oportunidades.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void font-sans text-ink">
        <noscript>
          <style>{`[data-boot-screen]{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
