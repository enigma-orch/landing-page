import type { Config } from "tailwindcss";

/**
 * Tokens derived from
 *   Packages/Foundation/DesignSystem/.../DRIPColor.swift
 * with refined editorial neutrals — warm cream base, single-accent-per-section.
 */
export default {
  content: ["./app/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        // Warm neutrals (Figma file uses cream, not cool white)
        cream: {
          50: "#FAF6EE",
          100: "#F5F0E6",
          200: "#EDE5D4",
          300: "#E0D5BC",
        },
        ink: {
          900: "#171513",
          800: "#262320",
          700: "#3A3631",
          600: "#5C544A",
          500: "#867A6B",
          400: "#B0A595",
          300: "#D2C7B5",
        },
        // Brand (kept identical to DRIPColor.swift but used SPARINGLY)
        drip: {
          pink: "#DD4982",
          purple: "#A281E9",
          cyan: "#3FDAE6",
          yellow: "#FFC400",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "TomatoGrotesk",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "TomatoGrotesk",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "'Instrument Serif'",
          "ui-serif",
          "Georgia",
          "Cambria",
          "serif",
        ],
      },
      fontSize: {
        // Editorial scale — tighter, bigger, less clamp-y
        eyebrow: ["0.72rem", { lineHeight: "1", letterSpacing: "0.18em", fontWeight: "600" }],
        "display-2xl": ["clamp(3rem, 8vw, 6.5rem)", { lineHeight: "0.96", letterSpacing: "-0.04em", fontWeight: "700" }],
        "display-xl": ["clamp(2.5rem, 6vw, 5rem)", { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "700" }],
        "display-lg": ["clamp(2rem, 4.5vw, 3.5rem)", { lineHeight: "1.04", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" }],
      },
      borderRadius: {
        "drip-sm": "8px",
        "drip-md": "12px",
        "drip-lg": "16px",
        "drip-xl": "20px",
        "drip-2xl": "28px",
        "drip-3xl": "40px",
      },
      boxShadow: {
        // Warmer shadows — no cold-blue tint
        soft: "0 2px 10px -2px rgba(38, 35, 32, 0.06), 0 1px 3px -1px rgba(38, 35, 32, 0.04)",
        card: "0 8px 30px -8px rgba(38, 35, 32, 0.10), 0 2px 6px -2px rgba(38, 35, 32, 0.06)",
        float: "0 30px 80px -30px rgba(38, 35, 32, 0.30), 0 12px 30px -12px rgba(38, 35, 32, 0.18)",
        "pink-glow": "0 30px 100px -30px rgba(221, 73, 130, 0.45)",
      },
      animation: {
        "marquee-x": "marquee-x 40s linear infinite",
        "float-y": "float-y 8s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out",
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float-y": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
