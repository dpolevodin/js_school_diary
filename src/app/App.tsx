import { useThemeSwitcher } from 'src/features/theme-switcher';
import { Pages } from 'src/pages';

export const App = () => {
  useThemeSwitcher();
  return <Pages />;
};
