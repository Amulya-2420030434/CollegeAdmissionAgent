// vite.config.js
// Configures the Vite dev server, including a proxy so frontend calls to
// "/api/*" are forwarded to the Flask backend running on port 5000.
// This avoids CORS issues during local development.

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
