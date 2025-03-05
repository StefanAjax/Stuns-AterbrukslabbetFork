import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: "hsl(var(--black))",
        white: "hsl(var(--white))",
        neutral: {
          "50": "hsl(var(--neutral-50))",
          "100": "hsl(var(--neutral-100))",
          "200": "hsl(var(--neutral-200))",
          "300": "hsl(var(--neutral-300))",
          "400": "hsl(var(--neutral-400))",
          "500": "hsl(var(--neutral-500))",
          "600": "hsl(var(--neutral-600))",
          "700": "hsl(var(--neutral-700))",
          "800": "hsl(var(--neutral-800))",
          "900": "hsl(var(--neutral-900))",
          "950": "hsl(var(--neutral-950))",
        },
        emerald: {
          "50": "hsl(var(--emerald-50))",
          "100": "hsl(var(--emerald-100))",
          "200": "hsl(var(--emerald-200))",
          "300": "hsl(var(--emerald-300))",
          "400": "hsl(var(--emerald-400))",
          "500": "hsl(var(--emerald-500))",
          "600": "hsl(var(--emerald-600))",
          "700": "hsl(var(--emerald-700))",
          "800": "hsl(var(--emerald-800))",
          "900": "hsl(var(--emerald-900))",
          "950": "hsl(var(--emerald-950))",
        },
        azure: {
          "50": "hsl(var(--azure-50))",
          "100": "hsl(var(--azure-100))",
          "200": "hsl(var(--azure-200))",
          "300": "hsl(var(--azure-300))",
          "400": "hsl(var(--azure-400))",
          "500": "hsl(var(--azure-500))",
          "600": "hsl(var(--azure-600))",
          "700": "hsl(var(--azure-700))",
          "800": "hsl(var(--azure-800))",
          "900": "hsl(var(--azure-900))",
          "950": "hsl(var(--azure-950))",
        },
        salmon: {
          "50": "hsl(var(--salmon-50))",
          "100": "hsl(var(--salmon-100))",
          "200": "hsl(var(--salmon-200))",
          "300": "hsl(var(--salmon-300))",
          "400": "hsl(var(--salmon-400))",
          "500": "hsl(var(--salmon-500))",
          "600": "hsl(var(--salmon-600))",
          "700": "hsl(var(--salmon-700))",
          "800": "hsl(var(--salmon-800))",
          "900": "hsl(var(--salmon-900))",
          "950": "hsl(var(--salmon-950))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        offer: "hsl(var(--offer))",
        request: "hsl(var(--request))",

        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
