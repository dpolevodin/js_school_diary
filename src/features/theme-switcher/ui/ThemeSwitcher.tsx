import { Space, Switch } from 'antd';
import { useUnit } from 'effector-react';
import { $theme, themeChanged } from '../model';
import './ThemeSwitcher.css';

export enum Themes {
  DEFAULT = 'default',
  DARK = 'dark',
}

const handleChange = themeChanged.prepend((checked: boolean) =>
  checked ? Themes.DARK : Themes.DEFAULT
);

export const ThemeSwitcher = () => {
  const themeValue = useUnit($theme);

  return (
    <Space className="Space">
      День
      <Switch
        checked={themeValue === Themes.DARK}
        onChange={handleChange}
        className="Space__switch"
      />
      Ночь
    </Space>
  );
};
