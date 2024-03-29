import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), astroImageTools],
  build: {
    assets: "assets",
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: "assets/[name].js",
          assetFileNames: "assets/[name][extname]",
        },
      },
    },
  },
});
