import { Login } from 'src/features/diary/login';
import { ThemeSwitcher } from 'src/features/theme-switcher';

import styles from './page.module.scss';

export const LoginPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Введите логин</h1>
          <ThemeSwitcher />
        </div>
        <Login />
      </div>
    </div>
  );
};
