import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/' — deploy targets: Vercel, Netlify, or any static host at domain root.
// For GitHub Pages project sites, set base to '/<repo-name>/' before building.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'es2019',
    cssCodeSplit: false,
  },
  // Allow the sandboxed live-preview host (and any host) to reach dev/preview servers.
  // Harmless for a static portfolio; tighten if you ever proxy untrusted hosts.
  server: { allowedHosts: true },
  preview: { allowedHosts: true },
})
