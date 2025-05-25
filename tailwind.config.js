/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          default: "hsl(var(--primary))", // Added default to handle cases where primary is used without variant
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          default: "hsl(var(--secondary))", // Added default
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          default: "hsl(var(--destructive))", // Added default
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          default: "hsl(var(--muted))", // Added default
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          default: "hsl(var(--accent))", // Added default
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          default: "hsl(var(--popover))", // Added default
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          default: "hsl(var(--card))", // Added default
          foreground: "hsl(var(--card-foreground))",
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
        "fade-in-down": {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "fade-in-up": {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "scale-in": {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        "bounce-in": {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '75%': { transform: 'scale(0.9)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-down": "fade-in-down 0.6s ease-out forwards",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.5s ease-out forwards",
        "bounce-in": "bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
