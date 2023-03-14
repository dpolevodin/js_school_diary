import { Layout, Row, Space } from "antd";
import { useUnit } from "effector-react";
import { PageLayout } from "../../shared/ui";
import { StudentLinks } from "../../features/student-links/StudentLinks";
import { $user } from "./model";
import { $repositories } from "../admin/model";
import { homeworkCards } from "./settings/mocks";
import { DiaryTable } from "../../features/diary-table/DiaryTable";

import styles from "./page.module.css";

const nav = ["schedule"];

export const StudentPage = () => {
  const [user, repositories] = useUnit([$user, $repositories]);

  return (
    <PageLayout title="Личный кабинет" nav={nav}>
      <Content className={styles._}>
        <Row>
          <Space size={100}>
            <DiaryTable
              studentName={user.name}
              studentSurname={user.surname}
              studentNickName={user.nickName}
              homeworkCards={homeworkCards}
            />

            <StudentLinks
              tgNickName={
                user.settings?.tgNickName
                  ? `tg: ${user.settings.tgNickName}`
                  : "Ваш telegram"
              }
              githubNickName={
                user.settings?.githubNickName
                  ? `github: ${user.settings.githubNickName}`
                  : "Ваш github никнейм"
              }
              repositories={repositories}
            />
          </Space>
        </Row>
      </Content>
    </PageLayout>
  );
};