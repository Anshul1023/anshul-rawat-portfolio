import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,

    // ✅ REQUIRED FOR @imgly/background-removal (WASM)
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // ⭐ REQUIRED FOR GLB + PNG imports
  assetsInclude: ["**/*.glb", "**/*.png"],

  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) {
            return "three";
          }

          if (id.includes("node_modules/gsap")) {
            return "gsap";
          }

          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
}));
