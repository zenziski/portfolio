"use client";

import { useEffect, useRef } from "react";

type RGB = readonly [number, number, number];

const BLUE = {
  pale: [222, 237, 245] as RGB,
  light: [174, 212, 231] as RGB,
  mid: [116, 172, 203] as RGB,
  deep: [60, 113, 145] as RGB,
  ink: [38, 78, 103] as RGB,
};

const SAGE = {
  pale: [228, 239, 223] as RGB,
  light: [190, 216, 193] as RGB,
  mid: [141, 182, 151] as RGB,
  deep: [80, 128, 101] as RGB,
  ink: [46, 83, 65] as RGB,
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mix(a: RGB, b: RGB, t: number): RGB {
  const k = Math.max(0, Math.min(1, t));
  return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), lerp(a[2], b[2], k)];
}

function rgba(c: RGB, alpha: number) {
  return `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(
    c[2]
  )}, ${alpha})`;
}

function wrapAngle(a: number) {
  const twoPi = Math.PI * 2;
  return (((a + Math.PI) % twoPi) + twoPi) % twoPi - Math.PI;
}

interface Blob {
  lon: number;
  lat: number;
  rx: number;
  ry: number;
}

const CONTINENTS: Blob[] = [
  { lon: -1.05, lat: -0.38, rx: 0.42, ry: 0.8 },
  { lon: -1.75, lat: 0.62, rx: 0.72, ry: 0.54 },
  { lon: -0.45, lat: 0.85, rx: 0.22, ry: 0.16 },
  { lon: 0.32, lat: 0.02, rx: 0.54, ry: 0.7 },
  { lon: 0.42, lat: 0.86, rx: 0.4, ry: 0.25 },
  { lon: 1.45, lat: 0.55, rx: 1.02, ry: 0.68 },
  { lon: 2.35, lat: -0.52, rx: 0.4, ry: 0.28 },
];

function isLand(lon: number, lat: number) {
  if (lat < -1.27) return true;
  for (const c of CONTINENTS) {
    const dx = wrapAngle(lon - c.lon) / c.rx;
    const dy = (lat - c.lat) / c.ry;
    if (dx * dx + dy * dy < 1) return true;
  }
  return false;
}

function drawGlobe(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number
) {
  const size = Math.min(w, h);
  const cx = w / 2;
  const cy = h / 2;
  const R = size * 0.46;
  const spacing = Math.max(5, size / 82);
  const spin = time * 0.16;

  let row = 0;
  for (let y = cy - R; y <= cy + R; y += spacing, row++) {
    const offset = row % 2 ? spacing / 2 : 0;
    for (let x = cx - R + offset; x <= cx + R; x += spacing) {
      const gx = x - cx;
      const gy = y - cy;
      const d2 = gx * gx + gy * gy;
      if (d2 > R * R) continue;

      const nx = gx / R;
      const ny = gy / R;
      const z = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      if (z < 0.07) continue;

      const lon = Math.atan2(nx, z) - spin;
      const lat = Math.asin(Math.max(-1, Math.min(1, -ny)));
      const land = isLand(lon, lat);

      const light = 0.42 + 0.58 * Math.max(0.08, 0.55 * z - 0.32 * nx - 0.22 * ny + 0.2);
      const edge = Math.min(1, z * 1.5 + 0.12);
      const twinkle = 0.9 + 0.1 * Math.sin(time * 1.3 + gx * 0.05 + gy * 0.04);

      const radius =
        spacing * (land ? 0.16 + 0.17 * light : 0.09 + 0.13 * light) * edge * twinkle;
      if (radius < 0.32) continue;

      const color = land
        ? mix(BLUE.ink, BLUE.mid, light * 0.78)
        : mix(BLUE.light, BLUE.mid, (1 - light) * 0.55);

      ctx.fillStyle = rgba(color, land ? 0.94 : 0.9);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawHorizon(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number
) {
  const cx = w * 0.5;
  const yTop = h * 0.18;
  const cy = (w * w) / 4 / (2 * (h - yTop)) + (h * h - yTop * yTop) / (2 * (h - yTop));
  const R = cy - yTop;
  const spacing = Math.max(6, w / 96);
  const spin = time * 0.1;

  let row = 0;
  for (let y = 0; y <= h; y += spacing, row++) {
    const offset = row % 2 ? spacing / 2 : 0;
    for (let x = -offset; x <= w; x += spacing) {
      const gx = x - cx;
      const gy = y - cy;
      const d2 = gx * gx + gy * gy;
      if (d2 > R * R) continue;

      const nx = gx / R;
      const ny = gy / R;
      const z = Math.sqrt(Math.max(0, 1 - nx * nx - ny * ny));
      if (z < 0.06) continue;

      const lon = Math.atan2(nx, z) - spin;
      const lat = Math.asin(Math.max(-1, Math.min(1, -ny)));
      const land = isLand(lon, lat);

      const light = 0.38 + 0.62 * Math.max(0.05, 0.82 * z + 0.24 * -ny);
      const edge = Math.min(1, z * 1.5 + 0.1);
      const twinkle = 0.92 + 0.08 * Math.sin(time * 1.1 + gx * 0.03 + gy * 0.03);

      const radius =
        spacing * (land ? 0.18 + 0.14 * light : 0.1 + 0.1 * light) * edge * twinkle;
      if (radius < 0.3) continue;

      const color = land
        ? mix(BLUE.mid, BLUE.ink, 0.35 + (1 - light) * 0.45)
        : mix(BLUE.light, BLUE.mid, 0.15 + (1 - light) * 0.65);

      ctx.fillStyle = rgba(color, land ? 0.92 : 0.88);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawWave(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number
) {
  const rows = 26;
  const baseY = h * 0.46;
  const step = Math.max(5, w / 110);
  const progress = 0.5;

  for (let r = 0; r < rows; r++) {
    const p = r / (rows - 1);
    const amp = h * 0.11 * (1 - p * 0.35);
    const freq = 0.011 + p * 0.006;
    const phase = time * (0.45 + p * 0.35) + r * 0.6;
    const yBase = baseY + p * h * 0.3;
    const color = mix(BLUE.light, BLUE.deep, p * 0.85);
    const alpha = 0.22 + (1 - p) * 0.5;

    for (let x = 0; x <= w; x += step) {
      const envelope = Math.exp(-Math.pow((x - w * progress) / (w * 0.62), 2));
      const y = yBase + Math.sin(x * freq + phase) * amp * envelope;
      const radius = (0.9 + (1 - p) * 2.1) * (0.7 + envelope * 0.5);
      ctx.fillStyle = rgba(color, alpha);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawRidge(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number
) {
  const spacing = Math.max(6, w / 88);
  const baseY = h * 0.9;
  const peaks = [
    { x: 0.16, height: 0.44, width: 0.17 },
    { x: 0.42, height: 0.66, width: 0.2 },
    { x: 0.67, height: 0.5, width: 0.16 },
    { x: 0.86, height: 0.32, width: 0.12 },
  ];

  for (let x = 0; x <= w; x += spacing) {
    let ridge = 0;
    for (const peak of peaks) {
      const dx = (x / w - peak.x) / peak.width;
      ridge += peak.height * Math.exp(-dx * dx);
    }
    ridge = Math.min(0.94, ridge);
    const ridgeY = h * 0.16 + (1 - ridge) * h * 0.58;

    for (let y = ridgeY; y < baseY; y += spacing) {
      const depth = (y - ridgeY) / Math.max(1, baseY - ridgeY);
      const radius = spacing * (0.11 + 0.15 * depth);
      const color = mix(SAGE.light, SAGE.ink, depth * 0.85);
      ctx.fillStyle = rgba(color, 0.32 + depth * 0.45);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const sunX = w * 0.74;
  const sunY = h * 0.26;
  const sunR = Math.min(w, h) * 0.1;
  const dots = 44;
  for (let i = 0; i < dots; i++) {
    const a = (i / dots) * Math.PI * 2 + time * 0.05;
    const radius = 1.4 + 1.2 * Math.sin(i * 1.7 + time * 0.5);
    ctx.fillStyle = rgba(SAGE.mid, 0.55);
    ctx.beginPath();
    ctx.arc(sunX + Math.cos(a) * sunR, sunY + Math.sin(a) * sunR, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export type DotVariant = "globe" | "horizon" | "wave" | "ridge";

interface DotArtProps {
  variant?: DotVariant;
  className?: string;
  label?: string;
  decorative?: boolean;
}

export default function DotArt({
  variant = "globe",
  className,
  label = "ilustração em pontilhismo",
  decorative = true,
}: DotArtProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    let width = 1;
    let height = 1;
    let raf = 0;
    let visible = true;

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const time = reduced ? 0 : (now - startedAt) / 1000;
      if (variant === "globe") drawGlobe(ctx, width, height, time);
      else if (variant === "horizon") drawHorizon(ctx, width, height, time);
      else if (variant === "wave") drawWave(ctx, width, height, time);
      else drawRidge(ctx, width, height, time);
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      width = Math.max(1, Math.floor(rect.width));
      height = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    };

    const loop = (now: number) => {
      if (visible) render(now);
      raf = window.requestAnimationFrame(loop);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrap);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "140px" }
    );
    intersectionObserver.observe(wrap);

    if (!reduced) raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [variant]);

  return (
    <div
      ref={wrapRef}
      className={`relative overflow-hidden ${className ?? ""}`}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block h-full w-full"
      />
    </div>
  );
}
