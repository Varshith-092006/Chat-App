import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],define: {
    // Make VITE_BACKEND_URL available at runtime as a global fallback
    __BACKEND__: JSON.stringify(process.env.VITE_BACKEND_URL || "http://localhost:5001"),
  },
})
