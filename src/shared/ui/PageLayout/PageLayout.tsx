import { Empty, Layout, Spin, Typography } from "antd";
import { useUnit } from "effector-react";
import {
  $isAdmin,
  $session,
  createSessionFx,
  getSessionFx,
} from "../../../entities/auth/session";
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
  isAdminPage?: boolean;
  isAccessFree?: boolean;
};

export const PageLayout = ({
  title,
  nav,
  className,
  children,
  isAdminPage,
  isAccessFree,
}: PageLayoutProps) => {
  const [isLoading, isLoadingSignIn, session, isAdmin] = useUnit([
    getSessionFx.pending,
    createSessionFx.pending,
    $session,
    $isAdmin,
  ]);

  const isAccessAllowed = isAdminPage ? isAdmin : true;
  const isContentShown = isAccessFree || session;

  return (
    <Layout>
      <PageHeader title={title} />
      <Layout hasSider>
        <NavigationSider title={title} nav={nav} />
        <Spin
          size="large"
          spinning={isLoading || isLoadingSignIn}
          wrapperClassName={styles.spin}
          className={styles.spinner}
        >
          <Content className={`${styles._} ${className}`}>
            {isContentShown && isAccessAllowed ? (
              children
            ) : (
              <Empty
                description={
                  <Text>
                    {isAccessAllowed
                      ? "Авторизуйтесь"
                      : "У вас нет прав для просмотра данной страницы"}
                  </Text>
                }
                className={styles.empty}
              />
            )}
          </Content>
        </Spin>
      </Layout>
    </Layout>
  );
};

PageLayout.defaultProps = {
  className: null,
  children: null,
  nav: [],
  isAdminPage: false,
  isAccessFree: false,
};
