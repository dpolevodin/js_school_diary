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
import styles from "./NavigationSider.module.css";
import { $isAdmin, $session } from "../../../entities/auth/session";
import { routes } from "../../../shared/lib/atomic-router/route";
import { IconMoon, IconSun } from "../../../shared/ui/Icons";
import {
  $theme,
  themeChanged,
  Themes,
  ThemeSwitcher,
} from "../../theme-switcher";

type NavigationProps = {
  title: string;
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

export const NavigationSider = ({ title }: NavigationProps) => {
  const [theme, themeChangedFn, session, isAdmin] = useUnit([
    $theme,
    themeChanged,
    $session,
    $isAdmin,
  ]);

  const handleClickSetDarkTheme = () => themeChangedFn(Themes.DARK);
  const handleClickSetDefaultTheme = () => themeChangedFn(Themes.DEFAULT);

  const [collapsed, setCollapsed] = useState(true);

  const navItems: MenuItem[] = Object.keys(NAV_MAP).map((navItem) => {
    if (navItem === "home") return NAV_MAP[navItem];
    if (session) {
      if (isAdmin) {
        return navItem === "scheduleUser" ? null : NAV_MAP[navItem];
      }
      return navItem === "scheduleUser" ? NAV_MAP[navItem] : null;
    }
    return null;
  });

  const themeItems = [
    getItem(
      <Link to="https://sberuniversity.online/" target="_blank">
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
          items={navItems}
        />

        <Menu
          selectable={false}
          theme="dark"
          mode="inline"
          items={themeItems}
        />
      </div>
    </Sider>
  );
};
