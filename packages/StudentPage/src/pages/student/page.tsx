import { useUnit } from "effector-react";
import { Button, Form, Input, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { $session } from "../../entities/auth/session";
import { $homeworksColumns } from "./lib/model";
import styles from "./page.module.css";
import { StudentLinks } from "../../features/student-links/StudentLinks";
import { $repositories, setUserSettings } from "./lib/mocks";
import { UserHomeworkType, UserSettingsType } from "./lib/types";
import { useState } from "react";
import { StudentSettingsPage } from "../studentSettings/page";

const { Title } = Typography;

type HomeworkData = {
  [key: string]: UserHomeworkType | string;
};

export const StudentPage = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [user, repositories, homeworksColumns, setUserSettingsFn] = useUnit([
    $session,
    $repositories,
    $homeworksColumns,
    setUserSettings,
  ]);

  const handleFinish = (value: UserSettingsType) => {
    setUserSettingsFn(value);
    setSettingsOpen(false);
  };
  
  const handleClickOpenSettings = () => setSettingsOpen(true);

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

  return isSettingsOpen ? (
    <StudentSettingsPage handleFinish={handleFinish} />
  ) : (
    <>
      <div className={styles._}>
        <Title className={styles.title}>
          Привет, {user?.name} {user?.surname} ({user?.nickName})
        </Title>
        <StudentLinks
          tgNickName={user?.settings?.tgNickName}
          githubNickName={user?.settings?.githubNickName}
          repositories={repositories}
          openSettings={handleClickOpenSettings}
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
    </>
  );
};
