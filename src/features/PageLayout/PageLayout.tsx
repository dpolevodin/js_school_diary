import { Empty, Layout, Spin, Typography } from "antd";
import { useUnit } from "effector-react";
import { NavigationSider } from "./NavigationSider/NavigationSider";
import { PageHeader } from "./PageHeader/PageHeader";
import styles from "./PageLayout.module.css";
import {
  getSessionFx,
  createSessionFx,
  $session,
  $isAdmin,
} from "../../entities/auth/session";
import { $pageSettings } from "../../pages";

const { Content } = Layout;
const { Text } = Typography;

type PageLayoutProps = {
  children?: React.ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  const [isLoading, isLoadingSignIn, session, isAdmin, pageSettings] = useUnit([
    getSessionFx.pending,
    createSessionFx.pending,
    $session,
    $isAdmin,
    $pageSettings,
  ]);

  const isAccessAllowed = pageSettings.isAdminPage ? isAdmin : true;
  const isContentShown = pageSettings.isAccessFree || session;

  return (
    <Layout>
      <PageHeader title={pageSettings.title} />
      <Layout hasSider>
        <NavigationSider title={pageSettings.title} />
        <Spin
          size="large"
          spinning={isLoading || isLoadingSignIn}
          wrapperClassName={styles.spin}
          className={styles.spinner}
        >
          <Content className={styles._}>
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
  children: null,
};
