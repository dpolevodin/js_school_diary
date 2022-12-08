import { useUnit } from "effector-react";
import { ConfigProvider, theme } from "antd";
import { $theme, Themes } from "./features/theme-switcher";
import "./App.css";
import { Pages } from "./pages";

export const App = () => {
  const themeValue = useUnit($theme);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeValue === Themes.DARK
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Pages />
    </ConfigProvider>
  );
};
