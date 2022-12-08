import { Layout } from "antd";
import { ThemeSwitcher } from "../../../features/theme-switcher";
import "./PageHeader.css";

const { Header } = Layout;

type Props = {
  title: string;
};

export const PageHeader = ({ title }: Props) => (
  <Header className="Header">
    <span className="Header__title">{title}</span>
    <ThemeSwitcher />
  </Header>
);
