import { useStore, useUnit } from "effector-react";
import reactLogo from "./assets/react.svg";
import { $count, addCountEvent } from "./store/counter";

import "./App.css";
import "./store/init";
import { Button, ConfigProvider, Layout, theme } from "antd";
import { $theme, ThemeSwitcher } from "./features/theme-switcher";

const { Content, Header } = Layout;
type Theme = 'dark' | 'light';

export const App = () => {
  const count = useStore($count);
  const [themeValue] = useUnit([$theme]);

  const handleClick = () => {
    addCountEvent();
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: themeValue === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <Layout>
        <Header
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ThemeSwitcher />
        </Header>
        <Content>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src="/vite.svg" className="logo" alt="Vite logo" />
            </a>
            <a href="https://reactjs.org" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <div className="card">
            <Button onClick={handleClick}>count is {count}</Button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
