<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
=======
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
>>>>>>> fc064152cbf5d6df436ff94653a895e74e9df2d1

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
<<<<<<< HEAD
})
=======
});
>>>>>>> fc064152cbf5d6df436ff94653a895e74e9df2d1
