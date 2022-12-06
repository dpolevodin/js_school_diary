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
          <h1 className="Header__title">{title}</h1>
          <ThemeSwitcher />
        </Header>
  );
};
