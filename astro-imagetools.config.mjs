import { defineConfig } from "astro-imagetools/config";

export default defineConfig({
  breakpoints: { minWidth: 400, maxWidth: 2560 },
  assetFileNames: "assets/[name]@[width][extname]",
  placeholder: "none",

  formatOptions: {
    jpg: {
      quality: 90,
    },
    png: {
      quality: 90,
    },
    webp: {
      quality: 90,
    },
    avif: {
      quality: 90,
    },
  },
});
