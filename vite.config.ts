import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  root: '.',
  publicDir: 'public',
  resolve: {
    alias: {
      'tesseract.js': path.resolve(__dirname, 'node_modules/tesseract.js/dist/tesseract.esm.min.js'),
    },
  },
  optimizeDeps: {
    include: ['tesseract.js'],
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
