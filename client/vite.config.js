import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://sure-book-server.vercel.app", // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
