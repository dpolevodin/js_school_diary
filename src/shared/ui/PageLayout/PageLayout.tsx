import {
  BankOutlined,
  BookOutlined,
  DiffOutlined,
  FormOutlined,
  HomeOutlined,
  LoginOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TrophyOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { Link } from "atomic-router-react";
import { useState } from "react";
import { routes } from "../../lib/atomic-router/route";
import { PageHeader } from "./PageHeader/PageHeader";
import styles from "./PageLayout.module.css";

const { Content, Sider } = Layout;

type PageProps = {
  title: string;
  nav: string[];
  className?: string;
  children?: React.ReactNode;
};

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
  schedule: getItem("Расписание", "schedule", <ScheduleOutlined />, [
    getItem(
      <Link to={routes.schedule}>
        <u>Расписание</u>
      </Link>,
      "schedule",
      <ScheduleOutlined />
    ),
    getItem(
      <Link to={routes.scheduleCreate}>
        <u>Создание</u>
      </Link>,
      "scheduleCreate",
      <DiffOutlined />
    ),
    getItem(
      <Link to={routes.scheduleEdit}>
        <u>Редактирование</u>
      </Link>,
      "scheduleEdit",
      <FormOutlined />
    ),
  ]),
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

  signIn: getItem(
    <Link to={routes.signIn}>
      <u>Вход</u>
    </Link>,
    "signIn",
    <LoginOutlined />
  ),
  signUp: getItem(
    <Link to={routes.signUp}>
      <u>Регистрация</u>
    </Link>,
    "signUp",
    <UserAddOutlined />
  ),
  student: getItem("Личный кабинет", "student", <UserOutlined />, [
    getItem(
      <Link to={routes.student}>
        <u>Личный кабинет</u>
      </Link>,
      "student",
      <UserOutlined />
    ),
    getItem(
      <Link to={routes.studentSettings}>
        <u>Настройки</u>
      </Link>,
      "studentSettings",
      <SettingOutlined />
    ),
  ]),
  admin: getItem(
    <Link to={routes.admin}>
      <u>Настройки курса</u>
    </Link>,
    "admin",
    <UserOutlined />
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
  "Редактирование расписания": "scheduleEdit",
  "Школа JS": "home",
  "Личный кабинет": "student",
  Настройки: "studentSettings",
};

export const PageLayout = ({ title, nav, className, children }: PageProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const items: MenuItem[] = nav.map((item) => NAV_MAP[item]);

  return (
    <Layout>
      <PageHeader title={title} />
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[SELECTED_PAGE_MAP[title]]}
            items={items}
          />
        </Sider>
        <Content className={`${styles._} ${className}`}>{children}</Content>
      </Layout>
    </Layout>
  );
};

PageLayout.defaultProps = {
  className: null,
  children: null,
};
