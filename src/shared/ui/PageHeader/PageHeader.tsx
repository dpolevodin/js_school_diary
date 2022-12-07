import { Layout, Typography } from "antd";
import { ReactElement } from "react";
import { ThemeSwitcher } from "../../../features/theme-switcher";
import './PageHeader.css'

const { Header } = Layout;
const { Title } = Typography;

type Props = {
    title: string,
  };

export const PageHeader = ({title}: Props) => {
  return (
        <Header className="Header">
          <span className="Header__title">{title}</span>
          <ThemeSwitcher />
        </Header>
  );
};
