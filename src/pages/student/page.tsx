import { useUnit } from "effector-react";
import { Table, Typography } from "antd";
import { PageLayout } from "../../shared/ui";
import { $session } from "../../entities/auth/session";
import { columns } from "./lib/mocks";
import { StudentLinks } from "../../features/student-links/StudentLinks";
import { $repositories } from "../admin/model";
import styles from "./page.module.css";

const nav = ["schedule"];
const { Title } = Typography;

export const StudentPage = () => {
  const [user, repositories] = useUnit([$session, $repositories]);
  return (
    <PageLayout title="Личный кабинет" nav={nav}>
      <div className={styles._}>
        <Title className={styles.title}>
          Привет, {user?.name} {user?.surname} ({user?.nickName})
        </Title>
        <StudentLinks
          tgNickName={user?.settings?.tgNickName}
          githubNickName={user?.settings?.githubNickName}
          repositories={repositories}
        />
      </div>
      {user && (
        <>
          <Title level={3}>Статус дз</Title>
          <Table
            dataSource={user?.homeworks ? [user.homeworks] : []}
            columns={columns}
            pagination={false}
          />
        </>
      )}
    </PageLayout>
  );
};
