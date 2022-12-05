import { useUnit } from "effector-react";

import "./App.css";
import { ConfigProvider, Layout, theme } from "antd";
import { $theme, ThemeSwitcher } from "./features/theme-switcher";

const { Content, Header } = Layout;
type Theme = "DARK" | "LIGHT";

export const App = () => {
  const [themeValue] = useUnit([$theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeValue === "DARK" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Header className="Header">
          <ThemeSwitcher />
        </Header>
        <Content></Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;