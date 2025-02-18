import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/card-swiper/',
  server: {
    host: true, // This will expose the server to the local network
  },
});
