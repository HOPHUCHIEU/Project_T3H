import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true, // ✅ fix reload/URL trực tiếp
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Địa chỉ backend của bạn
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Loại bỏ /api khỏi URL
      },
    },
  }
});
