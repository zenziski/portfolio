import type { ReactNode } from "react";
import { DoodleSquiggle, DoodleStar } from "./doodles";

function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type Tint = "sage" | "sky" | "cream";

interface TapeProps {
  className?: string;
  tint?: Tint;
  tilt?: number;
}

export function Tape({ className, tint = "sage", tilt = -3 }: TapeProps) {
  const bg =
    tint === "sky"
      ? "bg-sky/55"
      : tint === "cream"
        ? "bg-[#efe9cf]/75"
        : "bg-sage/50";
  return (
    <span
      aria-hidden
      className={cx("washi absolute h-6 w-24 opacity-90", bg, className)}
      style={{ transform: `rotate(${tilt}deg)` }}
    />
  );
}

interface PaperCardProps {
  children: ReactNode;
  className?: string;
  ruled?: boolean;
  grid?: boolean;
  dotted?: boolean;
}

export function PaperCard({
  children,
  className,
  ruled,
  grid,
  dotted,
}: PaperCardProps) {
  return (
    <div
      className={cx(
        "relative border border-line bg-paper paper-shadow",
        ruled && "ruled",
        grid && "grid-paper",
        dotted && "dot-paper",
        className
      )}
    >
      {children}
    </div>
  );
}

type StickyTint = "sticky" | "blue" | "sage";

interface StickyNoteProps {
  children: ReactNode;
  className?: string;
  tint?: StickyTint;
  tilt?: number;
}

export function StickyNote({
  children,
  className,
  tint = "sticky",
  tilt = -1.5,
}: StickyNoteProps) {
  const bg =
    tint === "blue"
      ? "bg-sticky-blue"
      : tint === "sage"
        ? "bg-mint"
        : "bg-sticky";
  return (
    <div
      className={cx(
        "relative paper-shadow-soft",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/40 before:to-transparent",
        bg,
        className
      )}
      style={{ transform: `rotate(${tilt}deg)` }}
    >
      {children}
    </div>
  );
}

interface StickerProps {
  children: ReactNode;
  className?: string;
  tint?: "sage" | "sky" | "mint" | "paper";
}

export function Sticker({ children, className, tint = "sage" }: StickerProps) {
  const bg =
    tint === "sky"
      ? "bg-sky-soft"
      : tint === "mint"
        ? "bg-mint"
        : tint === "paper"
          ? "bg-paper"
          : "bg-[#e6eedd]";
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-1 font-mono text-[11px] text-ink-soft",
        bg,
        className
      )}
    >
      {children}
    </span>
  );
}

interface HandProps {
  children: ReactNode;
  className?: string;
}

export function Hand({ children, className }: HandProps) {
  return <span className={cx("font-hand", className)}>{children}</span>;
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
  meta?: ReactNode;
  accent?: "sage" | "sky";
}

export function SectionLabel({
  children,
  className,
  meta,
  accent = "sage",
}: SectionLabelProps) {
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <span
        className={cx(
          "font-mono text-[11px] uppercase tracking-[0.26em]",
          accent === "sky" ? "text-sky-deep" : "text-sage-deeper"
        )}
      >
        {children}
      </span>
      <span className="h-px flex-1 bg-line-strong/60" />
      {meta && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
          {meta}
        </span>
      )}
    </div>
  );
}

interface ChapterHeadingProps {
  index: string;
  kicker: string;
  title: ReactNode;
  note?: ReactNode;
  accent?: "sage" | "sky";
}

export function ChapterHeading({
  index,
  kicker,
  title,
  note,
  accent = "sage",
}: ChapterHeadingProps) {
  return (
    <div className="relative mb-10">
      <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-faint sm:text-[11px]">
        <span>capítulo {index}</span>
        <span className="h-px w-8 bg-line-strong" />
        <span>{kicker}</span>
      </div>
      <h2 className="mt-4 font-display text-4xl leading-[0.95] tracking-tight text-ink sm:text-6xl">
        {title}
      </h2>
      {note && (
        <p
          className={cx(
            "mt-3 font-hand text-xl sm:text-2xl",
            accent === "sky" ? "text-sky-deep" : "text-sage-deeper"
          )}
        >
          {note}
        </p>
      )}
      <DoodleStar
        className={cx(
          "absolute -top-2 right-2 h-7 w-7 opacity-70 sm:right-6",
          accent === "sky" ? "text-sky-deep" : "text-sage-deep"
        )}
      />
    </div>
  );
}

interface StampProps {
  children: ReactNode;
  className?: string;
}

export function Stamp({ children, className }: StampProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1 rounded-sm border-2 border-dashed border-sky-deep/50 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-sky-deep",
        className
      )}
    >
      {children}
    </span>
  );
}

interface DividerProps {
  className?: string;
  accent?: "sage" | "sky";
}

export function SquiggleDivider({ className, accent = "sage" }: DividerProps) {
  return (
    <div
      className={cx(
        "flex items-center gap-3 opacity-50",
        accent === "sky" ? "text-sky-deep" : "text-sage-deep",
        className
      )}
      aria-hidden
    >
      <span className="h-px flex-1 bg-current opacity-30" />
      <DoodleSquiggle className="h-4 w-20" />
      <span className="h-px flex-1 bg-current opacity-30" />
    </div>
  );
}
