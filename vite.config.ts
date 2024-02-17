import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true }), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@/': new URL ('./src/', import.meta.url).pathname
    },
  },
  css: {
    postcss: {
      plugins: [],
      from: resolve(__dirname, 'src/style.css'),
      to: resolve(__dirname, 'dist/style.css')
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'vueComponents',
      fileName: 'vue-components'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
})
