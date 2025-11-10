// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwind({
      theme: {
        extend: {
          fontFamily: {
            inter: ['Inter', 'ui-sans-serif', 'system-ui', 'Arial', 'sans-serif'],
          },
        },
      },
    }),
  ],
})
