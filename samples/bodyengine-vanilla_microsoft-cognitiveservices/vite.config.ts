import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  server: {
    port: 5000,
  },
  base: './',
  optimizeDeps: {
    exclude: [
      '@davi-ai/bodyengine-three']
  },
  plugins: [basicSsl()],
})