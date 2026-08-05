"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { DownloadButton } from "@/components/ui/download-button";
import { SocialLinks } from "@/components/ui/social-links";

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 h-[var(--nav-height)] shrink-0 border-b border-border bg-background/80 backdrop-blur">
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <DownloadButton />
        <div className="absolute left-1/2 -translate-x-1/2">
          <SocialLinks />
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}