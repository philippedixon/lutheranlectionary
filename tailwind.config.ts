import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-body-text)",
        card: "var(--color-card)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        gold: "var(--color-gold)",
        "body-text": "var(--color-body-text)",
        border: "var(--color-border)",
        divider: "var(--color-divider)",
        "today-fill": "var(--color-today-fill)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        "eb-garamond": ["var(--font-eb-garamond)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
