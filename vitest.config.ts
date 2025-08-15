import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    includeSource: ["src/**/*.{js,ts,jsx,tsx}"],
    coverage: {
      enabled: true,
      all: true, // include files even if not tested
      include: ["src/**/*.{js,ts,jsx,tsx}"], // adjust to your project structure
      exclude: [
        "node_modules/",
        "dist/",
        "coverage/",
        "**/*.d.ts",
        "**/tests/**",
      ],
      provider: "istanbul", // or 'v8'
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "./coverage",
    },
    // reporters: ["html"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
    },
  },
});
