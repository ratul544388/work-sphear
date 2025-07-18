import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     "/api": "https://work-sphear.vercel.app",
  //     // "/api": "http://localhost:5000",
  //   },
  // },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
