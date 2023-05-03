import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./AdminPage": "./src/pages/admin/",
        "./model": "./src/pages/admin/model.ts"
      },
      shared: ["react", "react-dom", "antd", "effector", "effector-react", "dayjs", "@ant-design/icons"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
