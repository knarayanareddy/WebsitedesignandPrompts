import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  // Relative base so the build works from any subpath (GitHub Pages).
  base: './',
  plugins: [react()],
  server: {
    host: true,
    // Allow the sandbox preview proxy host (and any other Host header).
    allowedHosts: true,
  },
});
