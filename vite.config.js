import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias "src" to the base src folder
      '@': path.resolve(__dirname, 'src')
    }
  }
});
