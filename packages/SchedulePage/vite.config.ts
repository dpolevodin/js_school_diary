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
        "./SchedulePage": "./src/pages/schedule/",
        "./model": "./src/features/schedule-table/model/index.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "antd",
        "effector",
        "effector-react",
        "@ant-design/icons",
        "react-uuid",
        "dayjs",
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
