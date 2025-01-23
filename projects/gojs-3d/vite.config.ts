import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: true
  },
  plugins: [sveltekit()]
});
