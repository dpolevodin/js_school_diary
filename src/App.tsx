import { useUnit } from "effector-react";

import "./App.css";
import { ConfigProvider, theme } from "antd";
import { $theme } from "./features/theme-switcher";
import { Pages } from "./pages";

export const App = () => {
  const [themeValue] = useUnit([$theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeValue === "DARK" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Pages />
    </ConfigProvider>
  );
};

export default App;