import { defineConfig } from 'vite'
import { cpSync } from 'node:fs'

export default defineConfig({
  base: '/js-oop-examen/',
  publicDir: false,

  plugins: [
    {
      name: 'copy-game-images',
      closeBundle() {
        cpSync('images', 'dist/images', { recursive: true })
        cpSync('img', 'dist/img', { recursive: true })
      }
    }
  ],

  build: {
    outDir: 'dist'
  }
})
