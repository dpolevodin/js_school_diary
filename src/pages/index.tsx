import { Route } from 'atomic-router-react';

import { routes } from '../shared/lib/atomic-router/route';
import { AdminPage } from './admin';
import { ContestsPage } from './constests';
import { DiaryPage } from './diary';
import { HomePage } from './home';
import { SchedulePage, ScheduleCreatePage, ScheduleEditPage } from './schedule';
import { SignInPage, SignUpPage } from './sign';
import { StudentPage, StudentSettingsPage } from './student';

export const Pages = () => (
  <>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.admin} view={AdminPage} />
    <Route route={routes.contests} view={ContestsPage} />
    <Route route={routes.diary} view={DiaryPage} />
    <Route route={routes.schedule} view={SchedulePage} />
    <Route route={routes.scheduleCreate} view={ScheduleCreatePage} />
    <Route route={routes.scheduleEdit} view={ScheduleEditPage} />
    <Route route={routes.signIn} view={SignInPage} />
    <Route route={routes.signUp} view={SignUpPage} />
    <Route route={routes.student} view={StudentPage} />
    <Route route={routes.studentSettings} view={StudentSettingsPage} />
  </>
);

export const routesMap = [
  { path: '/', route: routes.home },
  { path: '/admin', route: routes.admin},
  { path: '/contests', route: routes.contests },
  { path: '/diary', route: routes.diary },
  { path: '/schedule', route: routes.schedule },
  { path: '/schedule/create', route: routes.scheduleCreate },
  { path: '/schedule/edit', route: routes.scheduleEdit },
  { path: '/sign-up', route: routes.signUp },
  { path: '/sign-in', route: routes.signIn },
  { path: '/student', route: routes.student },
  { path: '/student/settings', route: routes.studentSettings },
];