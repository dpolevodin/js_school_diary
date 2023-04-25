import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    federation({
      name: "remote-app",
      filename: "remoteEntry.js",
      remotes: {
        remote_app: "http://localhost:5001/assets/remoteEntry.js",
    },
      // Modules to expose
      exposes: {
        "./Button": "./src/Button.tsx",
      },
      shared: ["react"],
    }),
  ],
});
