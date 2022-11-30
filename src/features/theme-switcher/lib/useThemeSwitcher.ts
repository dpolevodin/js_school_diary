import { useEffect } from 'react';
import { useLocalStorage } from 'src/shared/lib';

type Theme = 'dark' | 'light';

export const useThemeSwitcher = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultDark ? 'dark' : 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return { theme, setTheme };
};
