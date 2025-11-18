import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permet l'accès depuis le réseau local
    port: 5173,
    strictPort: false,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
