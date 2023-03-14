import {
  UserOutlined,
  SettingOutlined,
  LoginOutlined,
  UserAddOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";
import { $session, signOut } from "../../../../entities/auth/session";
import { routes } from "../../../lib/atomic-router/route";
import styles from "./PageHeader.module.css";

const { Header } = Layout;

type Props = {
  title: string;
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

const items = [
  getItem("Авторизация", "auth", <LoginOutlined />, [
    getItem(
      <Link to={routes.signIn}>
        <u>Вход</u>
      </Link>,
      "signIn",
      <LoginOutlined />
    ),
    getItem(
      <Link to={routes.signUp}>
        <u>Регистрация</u>
      </Link>,
      "signUp",
      <UserAddOutlined />
    ),
  ]),
];

export const PageHeader = ({ title }: Props) => {
  const [session, signOutFn] = useUnit([$session, signOut]);
  const itemsSigned = [
    getItem("Личный кабинет", "studentTop", <UserOutlined />, [
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
      getItem(
        <span
          role="button"
          tabIndex={0}
          onClick={signOutFn}
          onKeyUp={signOutFn}
        >
          Выход
        </span>,
        "signOut",
        <LogoutOutlined />
      ),
    ]),
  ];

  return (
    <Header className={styles._}>
      <span className={styles.title}>{title}</span>
      <Menu
        className={styles.menu}
        theme="dark"
        mode="horizontal"
        items={session ? itemsSigned : items}
      />
    </Header>
  );
};
