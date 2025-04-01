import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [react()],
  css: {
    postcss: "./postcss.config.mjs",
  },
  envPrefix: "VITE_",
});
