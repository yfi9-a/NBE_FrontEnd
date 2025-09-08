import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import tailwindConfig from './tailwind.config.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(tailwindConfig),react()],
})
