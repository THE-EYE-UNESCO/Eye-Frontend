import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: "#020617",
        tealGlow: "#1de9e6",
        cyanGlow: "#5ef0ff",
        ocean: "#020b1a",
        slateSoft: "#9ca3af",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "Poppins", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 30px rgba(29, 233, 230, 0.7)",
        card: "0 20px 40px rgba(15, 23, 42, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

