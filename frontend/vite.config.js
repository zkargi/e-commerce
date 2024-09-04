import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './frontend',  // index.html'in bulunduğu dizin
  plugins: [react()],
  server:{
    port: 3000,
  },
  build: {
    outDir: 'dist'
  }
})
