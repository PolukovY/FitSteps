import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// GitHub Pages serves the app from /<repo>/ — keep base in sync with the repo name.
const base = process.env.VITE_BASE ?? '/fitSteps/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,woff2}'],
        navigateFallback: `${base}index.html`,
      },
      manifest: {
        name: 'FitSteps',
        short_name: 'FitSteps',
        description: 'Guided home workouts — no equipment, no account.',
        lang: 'en',
        start_url: base,
        scope: base,
        display: 'standalone',
        background_color: '#0B0C0F',
        theme_color: '#0B0C0F',
        orientation: 'portrait',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})
