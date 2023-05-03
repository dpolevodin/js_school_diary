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
        homePage: "http://localhost:5001/assets/remoteEntry.js",
        adminPage: "http://localhost:5002/assets/remoteEntry.js",
        contestsPage: "http://localhost:5003/assets/remoteEntry.js",
        diaryPage: "http://localhost:5004/assets/remoteEntry.js",
        schedulePage: "http://localhost:5005/assets/remoteEntry.js",
        scheduleEditPage: "http://localhost:5006/assets/remoteEntry.js",
        signInPage: "http://localhost:5007/assets/remoteEntry.js",
        signUpPage: "http://localhost:5008/assets/remoteEntry.js",
        studentPage: "http://localhost:5009/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "antd", "effector", "effector-react"]
  })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
});

