import { Space, Switch } from "antd";
import { useUnit } from "effector-react";
import { $theme, themeChanged } from "../model";
import "./ThemeSwitcher.css";

export const themes = { DARK: "dark", LIGHT: "light" };

export const ThemeSwitcher = () => {
  const [themeValue, themeChangedFn] = useUnit([$theme, themeChanged]);

  const handleChange = (checked: boolean) => {
    checked ? themeChangedFn(themes.DARK) : themeChangedFn(themes.LIGHT);
  };

  return (
    <Space className="Space">
      День
      <Switch
        checked={themeValue === themes.DARK}
        onChange={handleChange}
        className="Space__switch"
      />
      Ночь
    </Space>
  );
};
