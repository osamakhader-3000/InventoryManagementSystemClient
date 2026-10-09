import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [react(), envCompatible()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:7150',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
});
