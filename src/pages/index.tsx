import { Route } from 'atomic-router-react';

import { routes } from 'src/shared/routes';
import { LoginPage } from './login';
import { DiaryPage } from './diary';

export const Pages = () => (
  <>
    <Route route={routes.diary} view={DiaryPage} />
    <Route route={routes.login} view={LoginPage} />
  </>
);

export const routesMap = [
  { path: '/diary', route: routes.diary },
  { path: '/', route: routes.login },
];
