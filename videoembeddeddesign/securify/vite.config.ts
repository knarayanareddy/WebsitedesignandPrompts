import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // relative base so the static build works on GitHub Pages at ANY path
  // (username.github.io, username.github.io/<repo>, or a custom domain)
  base: './',
  server: {
    host: true,
    port: 5173,
    allowedHosts: true,
  },
})
