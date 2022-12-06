import { Login } from 'src/features/auth/loginByPassword';
import { routes } from 'src/shared/routes';

import styles from './page.module.css';

export const LoginPage = () => {
  const handleLoginSuccess = (values: any) => {
    console.log('Success:', values);
    routes.diary.open();
  };

  const handleLoginFail = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Введите логин</h1>
        </div>
        <Login onSuccess={handleLoginSuccess} onFail={handleLoginFail} />
      </div>
    </div>
  );
};
