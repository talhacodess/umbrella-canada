import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],

  resolve: {
    alias: {
      "redux-persist": "redux-persist/es",
    },
    dedupe: ["react", "react-dom"],
  },

  server: {
    allowedHosts: ["xcustompackaging.com", "www.xcustompackaging.com"],
    strictPort: true,
    
  },

  ssr: {
    noExternal: [
      "react-helmet-async",
      "react-dom/server",
      "react-redux",
      "redux-persist",
      "@reduxjs/toolkit",
      "lottie-react"
    ],
  },

  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-helmet-async",
      "react-redux",
      "@reduxjs/toolkit",
      'lottie-react'
    ],
    exclude: [
      "react-dom/server",
    ],
    esbuildOptions: {
      resolveExtensions: [".jsx", ".js", ".ts", ".tsx"],
    },
  },

  build: {
    target: "esnext",
    sourcemap: false, 
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          redux: ["react-redux", "@reduxjs/toolkit", "redux-persist"],
          vendor: ["react-helmet-async", "lottie-react"],
        },
      },
    },
  },
});