import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader(
            "Cross-Origin-Opener-Policy",
            "same-origin-allow-popups"
          );
          res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
          res.setHeader("Access-Control-Allow-Credentials", "true");
          next();
        });
      },
    },
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            // Place third-party dependencies in a separate chunk
            return "vendor";
          } else if (id.includes("src")) {
            // Place your local code in a separate chunk
            return "app";
          }
          // Let Vite handle other cases
        },
      },
    },
  },
});
