import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { reticle } from '@reticlehq/vite-plugin';
// https://vite.dev/config/
export default defineConfig({
  plugins: [reticle(),react()],
})
