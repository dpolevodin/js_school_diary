import { Empty, Layout, Typography } from "antd";
import { NavigationSider } from "./NavigationSider/NavigationSider";
import { PageHeader } from "./PageHeader/PageHeader";
import styles from "./PageLayout.module.css";

const { Content } = Layout;
const { Text } = Typography;

type PageLayoutProps = {
  title: string;
  nav?: string[];
  className?: string;
  children?: React.ReactNode;
  isSignedUp?: boolean;
};

export const PageLayout = ({
  title,
  nav,
  className,
  children,
  isSignedUp = true,
}: PageLayoutProps) => (
  <Layout>
    <PageHeader title={title} />
    <Layout>
      <NavigationSider title={title} nav={nav} />
      <Content className={`${styles._} ${className}`}>
        {isSignedUp ? (
          children
        ) : (
          <Empty
            description={<Text>Авторизуйтесь</Text>}
            className={styles.empty}
          />
        )}
      </Content>
    </Layout>
  </Layout>
);

PageLayout.defaultProps = {
  className: null,
  children: null,
  nav: [],
  isSignedUp: true,
};
