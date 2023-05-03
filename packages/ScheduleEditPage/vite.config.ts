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
        "./ScheduleEditPage": "./src/pages/scheduleEdit/page.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "effector",
        "effector-react",
        "antd",
        "@dnd-kit/core",
        "@dnd-kit/modifiers",
        "@dnd-kit/sortable",
        "@dnd-kit/utilities",
        "dayjs",
        "react-uuid",
        "classnames",
        "lodash.isempty",
        "@ant-design/icons",
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
