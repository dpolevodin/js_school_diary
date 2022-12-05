import { Space, Switch } from "antd";
import { useUnit } from "effector-react";
import { $theme, themeChanged } from "../model";
import "./ThemeSwitcher.css";

export const ThemeSwitcher = () => {
  const [themeValue, themeChangedFn] = useUnit([$theme, themeChanged]);
  console.log('theme', themeValue)

  const onChange = (checked: boolean) => {
    checked ? themeChangedFn("DARK") : themeChangedFn("LIGHT");
  };

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
