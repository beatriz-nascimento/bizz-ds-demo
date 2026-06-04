import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  // Tell Vite this app's root is the app folder, not the workspace root.
  root: __dirname,
  plugins: [react()],
  server: { port: 4201 },
  build: {
    outDir: resolve(__dirname, '../../dist/apps/react-demo'),
    emptyOutDir: true,
  },
});
