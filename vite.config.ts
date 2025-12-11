import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/Blog/', // GitHub Pages base path
    resolve: {
        alias: {
            buffer: 'buffer',
        },
    },
    optimizeDeps: {
        include: ['buffer'],
    },
    build: {
        outDir: 'dist',
    },
})

