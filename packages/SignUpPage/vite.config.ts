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
        "./SignUpPage": "./src/pages/signUp/page.tsx",
      },
      shared: [
        "react",
        "react-dom",
        "antd",
        "effector",
        "effector-react",
        "lodash.defaults",
        "lodash.isequal",
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
