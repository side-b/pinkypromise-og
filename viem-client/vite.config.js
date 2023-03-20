import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    target: ["es2020", "esnext"],
    outDir: "dist",
    lib: {
      entry: "src/main.ts",
      formats: ["es"],
    },
  },
  optimizeDeps: {
    entries: ["src/main.ts"],
  },
  plugins: [
    dts({ insertTypesEntry: true }),
  ],
});
