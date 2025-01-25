import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    base: '/paint-web/',
    build: {
        outDir: 'dist'
    },
    css: {
        devSourcemap: true
    }
});
