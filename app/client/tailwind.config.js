/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      animation: {
        "wave-pulse": "wave-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        "wave-pulse": {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.7 },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      screens: {
        xs: "475px", // Кастомный брейкпоинт для xs
        sm: "640px", // Уже существует в Tailwind, соответствует вашему
        md: "640px", // Уже существует в Tailwind, соответствует вашему
        lg: "640px", // Кастомный брейкпоинт для lg
        xl: "640px", // Уже существует в Tailwind, соответствует вашему
      },
    },
    container: {
      center: true,
      padding: "0.5rem",
      screens: {
        xs: "475px",
        sm: "640px",
        md: "640px",
        lg: "640px",
        xl: "640px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
