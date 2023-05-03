import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./StudentPage": "./src/pages/student",
      },
      shared: [
        "react",
        "react-dom",
        "antd",
        "effector",
        "effector-react",
        "@ant-design/icons",
        "classnames",
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
