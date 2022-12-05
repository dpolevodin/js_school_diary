import { Space, Switch } from "antd";
import { useUnit } from "effector-react";
import { useEffect } from "react";
import { $theme, themeChanged } from "../model";
import "./ThemeSwitcher.css";

export const ThemeSwitcher = () => {
  const [themeValue, themeChangedFn] = useUnit([$theme, themeChanged]);

  const onChange = (checked: boolean) => {
    checked ? themeChangedFn("DARK") : themeChangedFn("LIGHT");
  };

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  useEffect(() => {
    if (defaultDark) themeChangedFn("DARK");
  }, []);

  return (
    <Space className="Space">
      День
      <Switch
        checked={themeValue === "DARK"}
        onChange={onChange}
        className="Space__switch"
      />
      Ночь
    </Space>
  );
};
