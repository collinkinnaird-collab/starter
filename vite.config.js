import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: {
      path: '/hmr',
    },
    proxy: {
      '/api': 'http://localhost:4000',
      '/ws': {
        target: 'http://localhost:4000',
        ws: true,
      },
    },
  },
});