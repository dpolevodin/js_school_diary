import { Route } from "atomic-router-react";
import { Suspense, lazy } from "react";
import { createEvent, createStore } from "effector";
import { routes } from "../shared/lib/atomic-router/route";
import { Spin } from "antd";

const HomePage = lazy(() =>
  import("homePage/HomePage").then((module) => ({
    default: module.default.HomePage,
  }))
);

const AdminPage = lazy(() =>
  import("adminPage/AdminPage").then((module) => ({
    default: module.default.AdminPage,
  }))
);

const ContestsPage = lazy(() =>
  import("contestsPage/ContestsPage").then((module) => ({
    default: module.default.ContestsPage,
  }))
);
const DiaryPage = lazy(() =>
  import("diaryPage/DiaryPage").then((module) => ({
    default: module.default.DiaryPage,
  }))
);
const SchedulePage = lazy(() =>
  import("schedulePage/SchedulePage").then((module) => ({
    default: module.default.SchedulePage,
  }))
);
const ScheduleEditPage = lazy(() =>
  import("scheduleEditPage/ScheduleEditPage").then((module) => ({
    default: module.default.ScheduleEditPage,
  }))
);
const SignInPage = lazy(() =>
  import("signInPage/SignInPage").then((module) => ({
    default: module.default.SignInPage,
  }))
);
const SignUpPage = lazy(() =>
  import("signUpPage/SignUpPage").then((module) => ({
    default: module.default.SignUpPage,
  }))
);
const StudentPage = lazy(() =>
  import("studentPage/StudentPage").then((module) => ({
    default: module.default.StudentPage,
  }))
);

export const Pages = () => (
  <Suspense fallback={<Spin size="large" />}>
    <Route route={routes.home} view={HomePage} />
    <Route route={routes.admin} view={AdminPage} />
    <Route route={routes.contests} view={ContestsPage} />
    <Route route={routes.diary} view={DiaryPage} />
    <Route route={routes.schedule} view={SchedulePage} />
    <Route route={routes.scheduleEdit} view={ScheduleEditPage} />
    <Route route={routes.signIn} view={SignInPage} />
    <Route route={routes.signUp} view={SignUpPage} />
    <Route route={routes.student} view={StudentPage} />
  </Suspense>
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
