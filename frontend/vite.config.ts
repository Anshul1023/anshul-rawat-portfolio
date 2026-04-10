import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    port: 5173
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("three") || id.includes("@react-three")) {
            return "three-vendor";
          }

          if (id.includes("framer-motion") || id.includes("gsap")) {
            return "motion-vendor";
          }
        }
      }
    }
  }
});

