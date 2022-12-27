import { Layout } from "antd";
import { ThemeSwitcher } from "../../../features/theme-switcher";
import styles from "./PageHeader.module.css";

const { Header } = Layout;

type Props = {
  title: string;
};

export const PageHeader = ({ title }: Props) => (
  <Header className={styles._}>
    <span className={styles.title}>{title}</span>
    <ThemeSwitcher />
  </Header>
);
