import { UserOutlined, SettingOutlined } from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";
import { Link } from "atomic-router-react";
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
  ]),
];

export const PageHeader = ({ title }: Props) => (
  <Header className={styles._}>
    <span className={styles.title}>{title}</span>
    <Menu
      className={styles.menu}
      theme="dark"
      mode="horizontal"
      items={items}
    />
  </Header>
);
