import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "rgb(var(--bg-rgb) / <alpha-value>)",
          soft: "rgb(var(--bg-soft-rgb) / <alpha-value>)",
          raised: "rgb(var(--surface-rgb) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--surface-rgb) / <alpha-value>)",
          2: "rgb(var(--surface-2-rgb) / <alpha-value>)",
          3: "rgb(var(--surface-3-rgb) / <alpha-value>)",
        },
        line: {
          DEFAULT: "var(--line)",
          soft: "var(--line-soft)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink-rgb) / <alpha-value>)",
          2: "rgb(var(--ink-2-rgb) / <alpha-value>)",
          3: "rgb(var(--ink-3-rgb) / <alpha-value>)",
        },
        brand: {
          DEFAULT: "rgb(var(--brand-rgb) / <alpha-value>)",
          soft: "rgb(var(--brand-soft-rgb) / <alpha-value>)",
          deep: "rgb(var(--brand-deep-rgb) / <alpha-value>)",
        },
        accent2: "rgb(var(--accent2-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
        "3xl": "2.25rem",
      },
      maxWidth: {
        shell: "1240px",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-soft": "cubic-bezier(0.65, 0.05, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "marquee-slow": "marquee 64s linear infinite",
        shimmer: "shimmer 6s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
