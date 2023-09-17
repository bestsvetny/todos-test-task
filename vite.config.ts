/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        css: true,
        setupFiles: './src/shared/tests/setupTests.ts'
    },
    resolve: {
        alias: {
            src: '/src'
        }
    }
});
