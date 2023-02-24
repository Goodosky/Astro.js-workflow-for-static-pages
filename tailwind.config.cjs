/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
        secondary: "#86add3",
        dark: "#0a082b",
        light: "#F9F9F9",
        header: "#000",
        text: "#4d5154",
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
