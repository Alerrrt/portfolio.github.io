"use client";

import { usePlaySound } from "@/components/ui/sensory-ui/config/use-play-sound";

export function DownloadButton() {
  const { play: playHover } = usePlaySound({ sound: "interaction.subtle" });
  const { play: playConfirm } = usePlaySound({ sound: "interaction.confirm" });

  return (
    <a
      href="/Ajin_S_Resume.pdf"
      download="Ajin_S_Resume.pdf"
      onMouseEnter={playHover}
      onClick={playConfirm}
      className="matrix-btn group relative flex cursor-pointer items-center justify-center rounded-[0.5rem] transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)]"
      style={{
        width: "2.5rem",
        height: "2.5rem",
        padding: 0,
      }}
    >
      <div className="matrix-btn-border" />
      <img
        src="/penguin-btn.jpg"
        alt="Download Resume"
        className="relative z-10 h-full w-full overflow-hidden rounded-[0.375rem] object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
      />
      {/* Tooltip flag */}
      <span className="pointer-events-none absolute -top-10 left-1/2 z-50 whitespace-nowrap rounded-md border border-accent/30 bg-card px-3 py-1.5 font-mono text-xs text-accent opacity-0 shadow-lg transition-all duration-300 group-hover:-translate-x-1/2 group-hover:opacity-100">
        Click to Download Resume
      </span>
    </a>
  );
}
