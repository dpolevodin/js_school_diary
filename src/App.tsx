import { useEffect } from "react";
import { useUnit } from "effector-react";
import { ConfigProvider, theme } from "antd";
import { $theme, Themes } from "./features/theme-switcher";
import "./App.css";
import { Pages } from "./pages";
import { $session, pageMounted } from "./entities/auth/session";

export const App = () => {
  const themeValue = useUnit($theme);
  const [session, pageMountedFn] = useUnit([$session, pageMounted]);
  useEffect(() => {
    if (!session) pageMountedFn();
  }, [session, pageMountedFn]);

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
