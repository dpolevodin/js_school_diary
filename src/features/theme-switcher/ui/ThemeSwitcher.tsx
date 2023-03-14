import { Space, Switch } from "antd";
import { useUnit } from "effector-react";
import { $theme, themeChanged } from "../model";
import styles from "./ThemeSwitcher.module.css";

export enum Themes {
  DEFAULT = "default",
  DARK = "dark",
}

export const ThemeSwitcher = () => {
  const [themeValue, themeChangedFn] = useUnit([$theme, themeChanged]);

  const handleChange = (checked: boolean) =>
    checked ? themeChangedFn(Themes.DARK) : themeChangedFn(Themes.DEFAULT);

  return (
    <Space className={styles._}>
      День
      <Switch
        checked={themeValue === Themes.DARK}
        onChange={handleChange}
        className={styles.switch}
      />
      Ночь
    </Space>
  );
};
