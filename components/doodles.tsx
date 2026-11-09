interface DoodleProps {
  className?: string;
}

const common = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function DoodleStar({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden {...common}>
      <path d="M12 2.6c.5 5.3 1.6 7.2 6.9 8.5-5.1 1.1-6.6 2.4-7.2 7.9-.4-5.5-1.7-7.1-6.8-8.2 5.2-1 6.7-2.7 7.1-8.2Z" />
      <path d="M18.5 15.5c.2 1.9.7 2.6 2.6 3.1-1.9.4-2.4 1-2.6 2.9-.2-1.9-.7-2.5-2.5-2.9 1.8-.4 2.3-1.1 2.5-3.1Z" />
    </svg>
  );
}

export function DoodleArrow({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden {...common}>
      <path d="M4 30c10-14 24-21 44-18" />
      <path d="M39 6.5c3.4 3.2 5.6 4.9 9 6.2-4 1.1-6.6 2.6-9.6 5.8" />
    </svg>
  );
}

export function DoodleSquiggle({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 120 20" className={className} aria-hidden {...common}>
      <path d="M3 13c7-8 12-8 18 0s12 8 19 0 12-8 19 0 12 8 19 0 12-8 18 0" />
    </svg>
  );
}

export function DoodleCoffee({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
      <path d="M9 20h24v9a10 10 0 0 1-10 10h-4A10 10 0 0 1 9 29v-9Z" />
      <path d="M33 22h4a5 5 0 0 1 0 11h-4" />
      <path d="M9 43h28" />
      <path d="M16 15c-2-2 2-4 0-7M23 15c-2-2 2-4 0-7M30 15c-2-2 2-4 0-7" />
    </svg>
  );
}

export function DoodleLeaf({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 48" className={className} aria-hidden {...common}>
      <path d="M20 44c0-12 1-22 4-32" />
      <path d="M24 16c6-6 11-8 13-12-7 1-11 3-14 8" />
      <path d="M24 24c-8-4-13-4-17-2 5 3 10 5 17 4" />
      <path d="M23 33c7-4 12-4 16-2-5 4-10 6-16 4" />
      <path d="M20 10c1-5 3-8 6-9-1 5-2 8-6 9Z" />
    </svg>
  );
}

export function DoodleCloud({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden {...common}>
      <path d="M18 32c-6 0-10-4-9-9 1-4 4-6 8-6 0-5 4-9 10-9 5 0 9 3 10 7 6-2 12 1 12 7 0 6-4 10-10 10H18Z" />
      <path d="M18 40c8-3 23-3 31 0" />
    </svg>
  );
}

export function DoodleCode({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 56 40" className={className} aria-hidden {...common}>
      <path d="M20 6 6 20l14 14" />
      <path d="M36 6l14 14-14 14" />
      <path d="M32 4 24 36" />
    </svg>
  );
}

export function DoodleEye({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 56 36" className={className} aria-hidden {...common}>
      <path d="M4 18C12 8 20 4 28 4s16 4 24 14c-8 10-16 14-24 14S12 28 4 18Z" />
      <circle cx="28" cy="18" r="7" fill="currentColor" fillOpacity="0.15" />
      <circle cx="28" cy="18" r="3.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DoodleMoon({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden {...common}>
      <path d="M27 5c-9 1-15 8-14 17 1 8 8 13 16 12-9-5-12-20-2-29Z" />
      <path d="M31 8.5c.3 1.5.9 2.4 2.4 2.8-1.5.4-2 1.2-2.4 2.7-.3-1.5-.9-2.3-2.3-2.7 1.4-.4 2-1.3 2.3-2.8Z" />
    </svg>
  );
}

export function DoodleCompass({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 44 44" className={className} aria-hidden {...common}>
      <circle cx="22" cy="22" r="17" />
      <path d="m27 15-4 10-8 4 4-10 8-4Z" />
      <path d="M22 2v4M22 38v4M2 22h4M38 22h4" />
    </svg>
  );
}

export function DoodlePin({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 30" className={className} aria-hidden {...common}>
      <path d="M12 4c-4.5 0-7 3-7 6.5 0 4 4 6 5 12 .2 1.4 3.8 1.4 4 0 1-6 5-8 5-12C19 7 16.5 4 12 4Z" />
      <circle cx="12" cy="10" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DoodleHeart({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 36 32" className={className} aria-hidden {...common}>
      <path d="M18 28C8 20 3 15 3 9.5 3 5.9 5.9 3 9.4 3c2.6 0 4.6 1.5 5.7 3.2C16.3 4.5 18.4 3 21 3c3.5 0 6.4 2.9 6.4 6.5 0 5.5-5 10.5-9.4 18.5Z" />
    </svg>
  );
}

export function DoodleSun({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...common}>
      <circle cx="24" cy="24" r="9" />
      <path d="M24 3v6M24 39v6M3 24h6M39 24h6M9 9l4 4M35 35l4 4M39 9l-4 4M13 35l-4 4" />
    </svg>
  );
}

export function DoodlePaperclip({ className }: DoodleProps) {
  return (
    <svg viewBox="0 0 24 40" className={className} aria-hidden {...common}>
      <path d="M18 12v14a6 6 0 0 1-12 0V9a4 4 0 0 1 8 0v15a2 2 0 0 1-4 0V11" />
    </svg>
  );
}
