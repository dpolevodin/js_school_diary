import { Route } from "atomic-router-react";
import { createStore, createEvent } from "effector";
import { routes } from "../shared/lib/atomic-router/route";
import { AdminPage } from "./admin";
import { ContestsPage } from "./constests";
import { DiaryPage } from "./diary";
import { HomePage } from "./home";
import { SchedulePage, ScheduleEditPage } from "./schedule";
import { SignInPage, SignUpPage } from "./sign";
import { StudentPage, StudentSettingsPage } from "./student";

export const Pages = () => (
  <>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.admin} view={AdminPage} />
    <Route route={routes.contests} view={ContestsPage} />
    <Route route={routes.diary} view={DiaryPage} />
    <Route route={routes.schedule} view={SchedulePage} />
    <Route route={routes.scheduleEdit} view={ScheduleEditPage} />
    <Route route={routes.signIn} view={SignInPage} />
    <Route route={routes.signUp} view={SignUpPage} />
    <Route route={routes.student} view={StudentPage} />
    <Route route={routes.studentSettings} view={StudentSettingsPage} />
  </>
);

export const routesMap = [
  { path: "/", route: routes.home },
  { path: "/admin", route: routes.admin },
  { path: "/contests", route: routes.contests },
  { path: "/diary", route: routes.diary },
  { path: "/schedule", route: routes.schedule },
  { path: "/schedule/create", route: routes.scheduleEdit },
  { path: "/sign-up", route: routes.signUp },
  { path: "/sign-in", route: routes.signIn },
  { path: "/student", route: routes.student },
  { path: "/student/settings", route: routes.studentSettings },
];

type PageSettingsType = {
  title: string;
  isAccessFree: boolean;
  isAdminPage: boolean;
};

export const $pageSettings = createStore<PageSettingsType>({
  title: "Школа JS",
  isAccessFree: true,
  isAdminPage: false,
});

export const updatePageSettings = createEvent<string>();

const PAGES_MAP: { [key: string]: PageSettingsType } = {
  "/": { title: "Школа JS", isAccessFree: true, isAdminPage: false },
  "/admin": {
    title: "Настройки курса",
    isAccessFree: false,
    isAdminPage: true,
  },
  "/contests": { title: "Конкурсы", isAccessFree: false, isAdminPage: true },
  "/diary": { title: "Дневник", isAccessFree: false, isAdminPage: true },
  "/schedule": {
    title: "Расписание занятий",
    isAccessFree: false,
    isAdminPage: false,
  },
  "/schedule/create/": {
    title: "Редактирование расписания",
    isAccessFree: false,
    isAdminPage: true,
  },
  "/sign-up": { title: "Регистрация", isAccessFree: true, isAdminPage: false },
  "/sign-in": { title: "Вход", isAccessFree: true, isAdminPage: false },
  "/student": {
    title: "Личный кабинет",
    isAccessFree: false,
    isAdminPage: false,
  },
  "/student/settings": {
    title: "Настройки",
    isAccessFree: false,
    isAdminPage: false,
  },
};

$pageSettings.on(
  updatePageSettings,
  (_, payload) => PAGES_MAP[payload as keyof typeof PAGES_MAP]
);
