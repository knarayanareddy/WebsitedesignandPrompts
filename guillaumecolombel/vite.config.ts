import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  // Relative asset base so the built site works from any GitHub Pages subpath
  // (repo-wide deploy standard — see ../scripts/build-site.sh).
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
        },
      },
    },
  },
  server: { host: true, allowedHosts: true, port: 5173 },
  preview: { host: true, allowedHosts: true },
});
