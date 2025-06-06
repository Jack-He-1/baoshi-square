import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  // GitHub Pages 配置
  base: process.env.NODE_ENV === 'production' ? '/baoshi-square/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  // 处理 Lottie 文件路径
  define: {
    __VUE_PROD_DEVTOOLS__: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  assetsInclude: ['**/*.json'],
  css: {
    postcss: {
      // 配置已通过 postcss.config.cjs 生效
    }
  },
})
