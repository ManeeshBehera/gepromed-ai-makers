import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gepromed brand palette — medical azure blue (approx. of gepromed.com,
        // centralized here so exact hex can be swapped in one place).
        brand: {
          50: "#eff6fc",
          100: "#d6e8f7",
          200: "#b0d2ef",
          300: "#7fb4e3",
          400: "#4a90d4",
          500: "#2575c4",
          600: "#1b5ea6",
          700: "#184f86",
          800: "#17436d",
          900: "#14304b",
          950: "#0c1f33",
        },
        ink: {
          DEFAULT: "#0f1f2e",
          soft: "#33485c",
          muted: "#64798c",
        },
        accent: {
          DEFAULT: "#f59e42",
          soft: "#fde6c8",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(15, 31, 46, 0.18)",
        card: "0 2px 20px -8px rgba(15, 31, 46, 0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
