import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   headers: {
  //     'Content-Security-Policy': `style-src 'nonce-random' 'self'`,
  //   },
  // },
  plugins: [
    vue(), WindiCSS()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
