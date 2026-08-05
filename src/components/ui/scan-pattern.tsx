"use client";

import { useRef, useEffect, useCallback } from "react";
import { facts } from "@/data/facts";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~01";

interface ScanPatternProps {
  interval?: number;
  className?: string;
}

export function ScanPattern({
  interval = 10000,
  className = "",
}: ScanPatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const factIndexRef = useRef(0);
  const glitchOffsetRef = useRef<number[]>([]);
  const glitchTimerRef = useRef(0);

  const randomChar = () =>
    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const fact = facts[factIndexRef.current];
    const chars = fact.split("");

    // Initialize glitch offsets
    if (glitchOffsetRef.current.length !== chars.length) {
      glitchOffsetRef.current = chars.map(() => 0);
    }

    // Randomly trigger glitch on random chars
    if (Math.random() < 0.15) {
      const idx = Math.floor(Math.random() * chars.length);
      glitchOffsetRef.current[idx] = 6 + Math.random() * 10;
    }
    // Decay glitches
    glitchOffsetRef.current = glitchOffsetRef.current.map((v) =>
      Math.max(0, v - 0.4)
    );

    // Scan line
    glitchTimerRef.current += 2;
    if (glitchTimerRef.current > w + 200) {
      glitchTimerRef.current = -200;
      factIndexRef.current =
        (factIndexRef.current + 1) % facts.length;
      glitchOffsetRef.current = [];
    }

    const scanX = glitchTimerRef.current;

    // Glow trail behind scan
    const glow = ctx.createLinearGradient(
      Math.max(0, scanX - 120),
      0,
      scanX,
      0
    );
    glow.addColorStop(0, "rgba(141, 198, 255, 0)");
    glow.addColorStop(0.5, "rgba(141, 198, 255, 0.05)");
    glow.addColorStop(1, "rgba(141, 198, 255, 0.15)");
    ctx.fillStyle = glow;
    ctx.fillRect(Math.max(0, scanX - 120), 0, 120, h);

    // Bright scan line
    ctx.fillStyle = "rgba(141, 198, 255, 0.5)";
    ctx.fillRect(scanX, 0, 2, h);

    // Draw glitched text
    ctx.font = "12px ui-monospace, SFMono-Regular, monospace";
    ctx.textBaseline = "middle";

    const textX = scanX + 16;
    let xOffset = 0;

    for (let i = 0; i < chars.length; i++) {
      const glitch = glitchOffsetRef.current[i] || 0;
      const ch = glitch > 2 ? randomChar() : chars[i];

      // Main character
      ctx.fillStyle =
        glitch > 2
          ? "rgba(255, 100, 100, 0.8)"
          : "rgba(141, 198, 255, 0.7)";
      ctx.fillText(ch, textX + xOffset, h / 2 + (glitch > 4 ? Math.random() * 4 - 2 : 0));

      // Glitch shadow (RGB split)
      if (glitch > 3) {
        ctx.fillStyle = "rgba(255, 50, 50, 0.3)";
        ctx.fillText(ch, textX + xOffset - 2, h / 2 - 1);
        ctx.fillStyle = "rgba(50, 100, 255, 0.3)";
        ctx.fillText(ch, textX + xOffset + 2, h / 2 + 1);
      }

      xOffset += ctx.measureText(ch).width;
    }

    // Scanline noise bars
    for (let y = 0; y < h; y += 3) {
      if (Math.random() < 0.03) {
        ctx.fillStyle = `rgba(141, 198, 255, ${Math.random() * 0.1})`;
        ctx.fillRect(scanX - 40, y, 80, 1);
      }
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const factTimer = setInterval(() => {
      if (!pausedRef.current) {
        factIndexRef.current =
          (factIndexRef.current + 1) % facts.length;
        glitchOffsetRef.current = [];
      }
    }, interval);

    let lastTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const animate = (time: number) => {
      if (time - lastTime >= frameInterval) {
        lastTime = time;
        if (!pausedRef.current) {
          draw();
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      clearInterval(factTimer);
      window.removeEventListener("resize", resize);
    };
  }, [interval, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto absolute inset-0 ${className}`}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    />
  );
}