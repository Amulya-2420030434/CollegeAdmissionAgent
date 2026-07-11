// tailwind.config.js
// Defines the design system for the College Admission Agent:
// a professional blue-white theme with a class-based dark mode toggle.

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand blue scale — used for CTAs, links, active states
        brand: {
          50: "#eef4ff",
          100: "#dce8ff",
          200: "#b9d1ff",
          300: "#8ab0ff",
          400: "#5a87fb",
          500: "#3763f0",
          600: "#2547d6",
          700: "#1e39ab",
          800: "#1c3186",
          900: "#1a2c6b",
          950: "#111a3f",
        },
        // Neutral surface tones for light/dark backgrounds
        surface: {
          light: "#f7f9fc",
          dark: "#0b1220",
        },
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in-out",
        "slide-up": "slideUp 0.35s ease-out",
        "bounce-dot": "bounceDot 1.4s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        bounceDot: {
          "0%, 80%, 100%": { transform: "scale(0.6)", opacity: 0.4 },
          "40%": { transform: "scale(1)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
