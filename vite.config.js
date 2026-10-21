import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_BASE_URL || 'https://the-uniques-portal.vercel.app';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // Alias "src" to the base src folder
        '@': path.resolve(__dirname, 'src')
      }
    },
    server: {
      port: 5173,
      strictPort: false,
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          secure: false,
        },
        '/auth': {
          target,
          changeOrigin: true,
          secure: false,
        },
        '/upload': {
          target,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  };
});
