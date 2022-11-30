import { useMobile } from 'src/shared/lib';
import { Dropdown, DropdownItem } from 'src/shared/ui';
import { useThemeSwitcher } from '../lib';
import { Button } from 'antd';

const THEME_MAPPING = {
  dark: 'Темная тема',
  light: 'Светлая тема',
};

export const ThemeSwitcher = () => {
  const isMobile = useMobile();
  const { theme, setTheme } = useThemeSwitcher();

  const dropdownTrigger = isMobile ? (
    <Button type="primary">{THEME_MAPPING[theme]}</Button>
  ) : (
    <Button type="primary">{THEME_MAPPING[theme]}</Button>
  );

  return (
    <Dropdown
      trigger={dropdownTrigger}
      overlay={
        <>
          <DropdownItem>Выберите тему</DropdownItem>
          <DropdownItem>
            <Button type="primary" onClick={() => setTheme('light')}>
              Светлая
            </Button>
          </DropdownItem>
          <DropdownItem>
            <Button type="primary" onClick={() => setTheme('dark')}>
              Темная
            </Button>
          </DropdownItem>
        </>
      }
    />
  );
};
