import {
  BankOutlined,
  BookOutlined,
  FormOutlined,
  HomeOutlined,
  ScheduleOutlined,
  ToolOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps, Layout } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";
import { useState } from "react";
import { $session } from "../../../../entities/auth/session";
import {
  $theme,
  themeChanged,
  Themes,
  ThemeSwitcher,
} from "../../../../features/theme-switcher";
import { $adminIds } from "../../../../pages/sign/signUp/model";
import { routes } from "../../../lib/atomic-router/route";
import { IconMoon, IconSun } from "../../Icons";
import styles from "./NavigationSider.module.css";

type NavigationProps = {
  title: string;
  nav?: string[];
};

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const NAV_MAP: { [key: string]: ItemType } = {
  home: getItem(
    <Link to={routes.home}>
      <u>Главная</u>
    </Link>,
    "home",
    <HomeOutlined />
  ),
  schedule: getItem("Расписание", "scheduleTop", <ScheduleOutlined />, [
    getItem(
      <Link to={routes.schedule}>
        <u>Расписание</u>
      </Link>,
      "schedule",
      <ScheduleOutlined />
    ),
    getItem(
      <Link to={routes.scheduleEdit}>
        <u>Редактирование</u>
      </Link>,
      "scheduleEdit",
      <FormOutlined />
    ),
  ]),
  scheduleUser: getItem(
    <Link to={routes.schedule}>
      <u>Расписание</u>
    </Link>,
    "schedule",
    <ScheduleOutlined />
  ),
  diary: getItem(
    <Link to={routes.diary}>
      <u>Дневник</u>
    </Link>,
    "diary",
    <BookOutlined />
  ),
  contests: getItem(
    <Link to={routes.contests}>
      <u>Конкурсы</u>
    </Link>,
    "contests",
    <TrophyOutlined />
  ),
  admin: getItem(
    <Link to={routes.admin}>
      <u>Настройки курса</u>
    </Link>,
    "admin",
    <ToolOutlined />
  ),
  sberUniversity: getItem(
    <Link to="https://sberuniversity.online/">
      <u>Сберуниверситет</u>
    </Link>,
    "sberUniversity",
    <BankOutlined />
  ),
};

const SELECTED_PAGE_MAP: { [key: string]: string } = {
  "Настройки курса": "admin",
  Конкурсы: "contests",
  Дневник: "diary",
  Расписание: "schedule",
  "Создание расписания": "scheduleCreate",
  "Школа JS": "home",
  "Личный кабинет": "student",
  Настройки: "studentSettings",
};

export const NavigationSider = ({ title, nav = [] }: NavigationProps) => {
  const [theme, themeChangedFn, session, adminIds] = useUnit([
    $theme,
    themeChanged,
    $session,
    $adminIds,
  ]);

  const handleClickSetDarkTheme = () => themeChangedFn(Themes.DARK);
  const handleClickSetDefaultTheme = () => themeChangedFn(Themes.DEFAULT);

  const [collapsed, setCollapsed] = useState(true);
  const expandedNav = ["home", ...nav];
  const items: (MenuItem | null)[] = expandedNav.map((item) => {
    if (item === "home" || item === "sberUniversity") {
      return NAV_MAP[item];
    }
    if (session) {
      if (adminIds.includes(session?.id)) {
        return NAV_MAP[item];
      }
      return item === "schedule" ? NAV_MAP.scheduleUser : null;
    }
    return null;
  });

  const ThemeItems = [
    getItem(
      <Link to="https://sberuniversity.online/">
        <u>Сберуниверситет</u>
      </Link>,
      "sberUniversity",
      <BankOutlined />
    ),
    getItem(
      <ThemeSwitcher />,
      "theme",
      theme === Themes.DARK ? (
        <button
          type="button"
          onClick={handleClickSetDefaultTheme}
          className={styles.button}
        >
          <IconMoon className={styles.icon} />
        </button>
      ) : (
        <button
          type="button"
          onClick={handleClickSetDarkTheme}
          className={styles.button}
        >
          <IconSun className={styles.icon} />
        </button>
      )
    ),
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={styles._}>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[SELECTED_PAGE_MAP[title]]}
          items={items}
        />

        <Menu
          selectable={false}
          theme="dark"
          mode="inline"
          items={ThemeItems}
        />
      </div>
    </Sider>
  );
};

NavigationSider.defaultProps = {
  nav: [],
};
