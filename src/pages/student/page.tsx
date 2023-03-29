import { useUnit } from "effector-react";
import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { PageLayout } from "../../shared/ui";
import { $session } from "../../entities/auth/session";
import { StudentLinks } from "../../features/student-links/StudentLinks";
import { $repositories } from "../admin/model";
import styles from "./page.module.css";
import { $homeworksColumns } from "./model";
import { Homework } from "../sign/signUp/lib/types";

const nav = ["schedule"];
const { Title } = Typography;

type HomeworkData = {
  [key: string]: Homework | string;
};

export const StudentPage = () => {
  const [user, repositories, homeworksColumns] = useUnit([
    $session,
    $repositories,
    $homeworksColumns,
  ]);

  const homeworksData = user?.homeworks
    ? [
        user.homeworks.reduce(
          (homeworks, homework) => {
            const { id } = homework;
            return {
              ...homeworks,
              [id as string]: {
                id: homework.id,
                title: homework.title,
                deadline: homework.deadline,
                status: homework.status,
              },
            };
          },
          { key: "homeworks" }
        ),
      ]
    : undefined;

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
      {user?.homeworks && user?.homeworks.length > 0 && (
        <>
          <Title level={3}>Статус дз</Title>
          <Table
            dataSource={
              homeworksData ? (homeworksData as HomeworkData[]) : undefined
            }
            columns={homeworksColumns as ColumnsType<HomeworkData>}
            pagination={false}
          />
        </>
      )}
    </PageLayout>
  );
};
