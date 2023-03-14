import { Layout } from "antd";
import { NavigationSider } from "./NavigationSider/NavigationSider";
import { PageHeader } from "./PageHeader/PageHeader";
import styles from "./PageLayout.module.css";

const { Content } = Layout;

type PageLayoutProps = {
  title: string;
  nav?: string[];
  className?: string;
  children?: React.ReactNode;
};

export const PageLayout = ({
  title,
  nav,
  className,
  children,
}: PageLayoutProps) => (
  <Layout>
    <PageHeader title={title} />
    <Layout>
      <NavigationSider title={title} nav={nav} />
      <Content className={`${styles._} ${className}`}>{children}</Content>
    </Layout>
  </Layout>
);

PageLayout.defaultProps = {
  className: null,
  children: null,
  nav: [],
};
