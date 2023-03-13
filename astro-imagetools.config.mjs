import { defineConfig } from "astro-imagetools/config";

export default defineConfig({
  breakpoints: { minWidth: 400 },
  assetFileNames: "_astro/[name]@[width][extname]",

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
