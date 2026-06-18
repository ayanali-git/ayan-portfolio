"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export const AnimatedThemeToggle = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-foreground opacity-50",
          className
        )}
        disabled
      >
        <div className="h-5 w-5" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <AnimatedThemeToggler
      theme={isDark ? "dark" : "light"}
      onThemeChange={(newTheme) => setTheme(newTheme)}
      variant="circle"
      duration={500}
      className={cn(
        "inline-flex items-center justify-center rounded-md border border-input bg-background p-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors [&_svg]:size-4 h-9 w-9",
        className
      )}
    />
  );
};
