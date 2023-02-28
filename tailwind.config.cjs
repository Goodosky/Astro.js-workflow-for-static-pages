/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  safelist: [
    // Sidebar
    "md:div-reset",
    "lg:div-reset",
    "xl:div-reset",
    "2xl:div-reset",
    "md:hidden",
    "lg:hidden",
    "xl:hidden",
    "2xl:hidden",

    // Backdrop
    "overflow-y-hidden",
    "fixed",
    "w-screen",
    "h-screen",
    "bg-neutral-900",
    "opacity-50",
    "z-20",
    "transition",
    "top-0",
    "left-0",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "0.75rem",
          sm: "2rem",
          lg: "2rem",
          xl: "3rem",
          "2xl": "6rem",
        },
      },

      colors: {
        primary: "#86add3",
        secondary: "#255a8c",
        dark: "#0a082b",
        light: "#F9F9F9",

        // Text colors
        header: "#000",
        "light-header": "#ffffff",
        text: "#4d5154",
        "light-text": "#eee",
      },

      screens: {
        "2xl": "1475px", // 1475px + 2*6rem = 1283px container (so like in Figma)
      },

      fontFamily: {
        header: ["manrope", "sans-serif"],
        text: ["manrope", "sans-serif"],
      },
    },
  },
  plugins: [],
};
