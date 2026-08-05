"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaySound } from "@/components/ui/sensory-ui/config/use-play-sound";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { play } = usePlaySound({ sound: "interaction.toggle" });

  React.useEffect(() => setMounted(true), []);

  return (
    <motion.button
      aria-label="Toggle theme"
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        play();
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-accent/60 hover:bg-secondary"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted && theme === "dark" ? "sun" : "moon"}
          initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="inline-flex"
        >
          {mounted && theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
