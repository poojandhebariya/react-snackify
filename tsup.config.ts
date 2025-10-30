import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  injectStyle: false, // don’t emit snack-bar-XXXX.css
  external: ["react", "react-dom"],
});
