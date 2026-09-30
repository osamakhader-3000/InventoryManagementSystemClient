import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from "vite-plugin-env-compatible";

export default defineConfig({
  plugins: [react(), envCompatible()],
  server: {
    port: 5173,
    proxy: {
      '/security': {
        target: 'https://localhost:5001',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/steletusapp': {
        target: 'https://localhost:5001',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
});