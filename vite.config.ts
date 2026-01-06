import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  base: './', // Use relative paths for assets to work in subdirectories (like GitHub Pages)
  build: {
    outDir: 'dist',
  }
});