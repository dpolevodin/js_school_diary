import { useUnit } from "effector-react";
import { ConfigProvider, Layout, theme } from "antd";
import { $theme, Themes } from "./features/theme-switcher";
import { PageHeader } from "./shared/ui/PageHeader/PageHeader";
import "./App.css";

const { Content } = Layout;

export const App = () => {
  const [themeValue] = useUnit([$theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeValue === Themes.DARK
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <PageHeader title="Школа JS" />
        <Content></Content>
      </Layout>
    </ConfigProvider>
  );
};