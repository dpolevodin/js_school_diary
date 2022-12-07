<<<<<<< HEAD
import { useUnit } from "effector-react";
import { ConfigProvider, Layout, theme } from "antd";
import { $theme, themes } from "./features/theme-switcher";
import { PageHeader } from "./shared/ui/PageHeader/PageHeader";
import "./App.css";

const { Content } = Layout;

export const App = () => {
  const [themeValue] = useUnit([$theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          themeValue === themes.DARK
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
=======
import { useStore } from 'effector-react';
import reactLogo from './assets/react.svg';
import { $count, addCountEvent } from './store/counter';

import './App.css';
import './store/init';
import { Button } from 'antd';

export const App = () => {
    const count = useStore($count);

    const handleClick = () => {
        addCountEvent();
    };

    return (
        <div className="App">
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img
                        src={reactLogo}
                        className="logo react"
                        alt="React logo"
                    />
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
        </div>
    );
};

export default App;
>>>>>>> develop
