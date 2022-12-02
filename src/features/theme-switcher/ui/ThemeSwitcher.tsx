import { Space, Switch } from "antd";
import { useUnit } from "effector-react";
import { $theme, themeChanged } from "../model";

export const ThemeSwitcher = () => {
  const [themeValue, themeChangedFn] = useUnit([$theme, themeChanged]);

  const onChange = (checked: boolean) => {
    checked ? themeChangedFn("dark") : themeChangedFn("light");
  };

  return (
    <Space style={{color: '#fff'}}>
      День
      <Switch checked={themeValue === "dark"} onChange={onChange} style={{backgroundColor: '#d9d9d9'}}/>
      Ночь
    </Space>
  );
};
