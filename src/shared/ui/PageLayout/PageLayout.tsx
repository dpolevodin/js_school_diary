import { Empty, Layout, Spin, Typography } from "antd";
import { useUnit } from "effector-react";
import { getSessionFx } from "../../../entities/auth/session";
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
}: PageLayoutProps) => {
  const loading = useUnit(getSessionFx.pending);

  return (
    <Layout>
      <PageHeader title={title} />
      <Layout hasSider>
        <NavigationSider title={title} nav={nav} />

        <Content className={`${styles._} ${className}`}>
          <Spin size="large" spinning={loading} wrapperClassName={styles.spin}>
            {isSignedUp ? (
              children
            ) : (
              <Empty
                description={<Text>Авторизуйтесь</Text>}
                className={styles.empty}
              />
            )}
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
};

PageLayout.defaultProps = {
  className: null,
  children: null,
  nav: [],
  isSignedUp: true,
};
