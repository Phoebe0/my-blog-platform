import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: '../server/client/dist', // 构建到后端目录
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://81.69.253.23:3038', // 改为实际域名
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    plugins: [react()],

})
