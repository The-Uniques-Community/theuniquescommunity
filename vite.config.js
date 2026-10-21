import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.VITE_API_BASE_URL || 'https://the-uniques-portal.vercel.app';
  const isLocalHttps = /^https:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(?:$|\/)/i.test(target);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        // Alias "src" to the base src folder
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      chunkSizeWarningLimit: 1600
    },
    server: {
      port: 5173,
      strictPort: false,
      proxy: {
        '/api': {
          target,
          changeOrigin: true,
          ...(isLocalHttps ? { secure: false } : {}),
        },
        '/auth': {
          target,
          changeOrigin: true,
          ...(isLocalHttps ? { secure: false } : {}),
        },
        '/upload': {
          target,
          changeOrigin: true,
          ...(isLocalHttps ? { secure: false } : {}),
        }
      }
    }
  };
});
