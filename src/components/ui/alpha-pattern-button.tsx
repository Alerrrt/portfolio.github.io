"use client";

import { useRef, useEffect, useCallback } from "react";

export function AlphaPatternButton() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    timeRef.current += 0.03;

    ctx.clearRect(0, 0, w, h);

    const t = timeRef.current;

    // Grid pattern
    for (let x = 0; x < w; x += 6) {
      for (let y = 0; y < h; y += 6) {
        const wave = Math.sin(x * 0.1 + t) * Math.cos(y * 0.1 + t * 0.7);
        const alpha = Math.abs(wave) * 0.6 + 0.1;

        // Color shift based on position
        const r = 141 + Math.sin(t + x * 0.05) * 40;
        const g = 198 + Math.cos(t + y * 0.05) * 30;
        const b = 255;

        ctx.fillStyle = `rgba(${Math.floor(r)}, ${Math.floor(g)}, ${b}, ${alpha})`;
        ctx.fillRect(x, y, 4, 4);
      }
    }

    // Scan line overlay
    const scanY = (t * 20) % h;
    const scanGrad = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
    scanGrad.addColorStop(0, "rgba(141, 198, 255, 0)");
    scanGrad.addColorStop(0.5, "rgba(141, 198, 255, 0.15)");
    scanGrad.addColorStop(1, "rgba(141, 198, 255, 0)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 20, w, 40);

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 36;
    canvas.height = 36;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <a
      href="/Ajin_S_Resume.pdf"
      download="Ajin_S_Resume.pdf"
      className="group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-border transition-all duration-300 hover:border-accent"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      {/* Hover popup */}
      <span className="pointer-events-none absolute -bottom-8 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[10px] text-card-foreground opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100">
        Download Resume
      </span>
    </a>
  );
}