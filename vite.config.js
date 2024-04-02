/* global __dirname */
import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        popup: path.resolve(__dirname, 'src/popup/index.html'),
        background: path.resolve(__dirname, 'src/background/index.js'),
        content: path.resolve(__dirname, 'src/content/index.js'),
        // options: path.resolve(__dirname, 'src/options/index.html'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [react()],
});