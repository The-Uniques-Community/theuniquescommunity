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
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('react/') ||
                id.includes('react-dom/') ||
                id.includes('react-router/') ||
                id.includes('react-router-dom/') ||
                id.includes('scheduler/')
              ) {
                return 'vendor-react';
              }
              if (id.includes('@mui/') || id.includes('@emotion/')) {
                return 'vendor-mui';
              }
              if (id.includes('framer-motion/') || id.includes('gsap/')) {
                return 'vendor-animation';
              }
              if (
                id.includes('chart.js/') ||
                id.includes('react-chartjs-2/') ||
                id.includes('recharts/')
              ) {
                return 'vendor-charts';
              }
              if (
                id.includes('lucide-react/') ||
                id.includes('react-icons/') ||
                id.includes('@tabler/icons-react/') ||
                id.includes('@fortawesome/')
              ) {
                return 'vendor-icons';
              }
              if (
                id.includes('jspdf/') ||
                id.includes('xlsx/') ||
                id.includes('@react-pdf/')
              ) {
                return 'vendor-export';
              }
            }
          }
        }
      }
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
