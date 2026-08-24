"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center text-text-muted opacity-50 ${className}`} />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-surface-elevated border border-border hover:border-border-hover transition-all flex items-center justify-center ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-accent" />
      ) : (
        <Moon className="w-4 h-4 text-accent" />
      )}
    </button>
  );
};
