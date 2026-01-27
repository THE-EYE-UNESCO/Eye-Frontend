import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.7rem", // 11px
        sm: "0.8rem", // 12.8px
        base: "0.9rem", // 14.4px
        lg: "1rem", // 16px
        xl: "1.15rem", // 18.4px
        "2xl": "1.35rem", // 21.6px
        "3xl": "1.6rem", // 25.6px
        "4xl": "1.85rem", // 29.6px
        "5xl": "2.1rem", // 33.6px
        "6xl": "2.4rem", // 38.4px
        "7xl": "2.6rem", // 41.6px
        "8xl": "2.8rem", // 44.8px
        "9xl": "3rem", // 48px
      },
      colors: {
        night: "#020617",
        tealGlow: "#1de9e6",
        cyanGlow: "#5ef0ff",
        ocean: "#020b1a",
        slateSoft: "#9ca3af",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        "glow-button": "var(--shadow-glow-button)",
        "glow-red": "var(--shadow-glow-red)",
        card: "0 20px 40px rgba(15, 23, 42, 0.5)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

