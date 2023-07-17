import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
          res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
          next();
        });
      },
    },
    react(),
    root: "./src",
  build: {
    outDir: "dist",
  },
  rollupOptions: {
    input: "main.tsx",
  },
  ],
})
