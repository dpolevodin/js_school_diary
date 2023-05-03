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
      name: 'Layout',
      remotes: {
        homePage: "http://localhost:5101/assets/remoteEntry.js",
        adminPage: "http://localhost:5102/assets/remoteEntry.js",
        contestsPage: "http://localhost:5103/assets/remoteEntry.js",
        diaryPage: "http://localhost:5104/assets/remoteEntry.js",
        schedulePage: "http://localhost:5105/assets/remoteEntry.js",
        scheduleEditPage: "http://localhost:5106/assets/remoteEntry.js",
        signInPage: "http://localhost:5107/assets/remoteEntry.js",
        signUpPage: "http://localhost:5108/assets/remoteEntry.js",
        studentPage: "http://localhost:5109/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "antd", "effector", "effector-react", "dayjs"]
  })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});

