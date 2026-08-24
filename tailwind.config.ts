import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        border: "var(--border)",
        "border-hover": "var(--border-hover)",
        "text-primary": "var(--text-primary)",
        "text-muted": "var(--text-muted)",
        "text-subtle": "var(--text-subtle)",
        accent: "var(--accent)",
        "accent-dim": "var(--accent-dim)",
        "accent-hover": "var(--accent-hover)",
        "code-bg": "var(--code-bg)",
        "callout-def": "var(--callout-def)",
        "callout-valid": "var(--callout-valid)",
        "callout-invalid": "var(--callout-invalid)",
        "callout-example": "var(--callout-example)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
