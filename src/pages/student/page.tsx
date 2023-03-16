import { Row, Col } from "antd";
import { useUnit } from "effector-react";
import { PageLayout } from "../../shared/ui";
import { StudentLinks } from "../../features/student-links/StudentLinks";
import { $user } from "./model";
import { $repositories } from "../admin/model";
import { homeworkCards } from "./settings/mocks";
import { DiaryTable } from "../../features/diary-table/DiaryTable";

const nav = ["schedule"];

export const StudentPage = () => {
  const [user, repositories] = useUnit([$user, $repositories]);

  return (
    <PageLayout title="Личный кабинет" nav={nav}>
      <Row gutter={16}>
        <Col span={20}>
          <DiaryTable
            studentName={user.name}
            studentSurname={user.surname}
            studentNickName={user.nickName}
            homeworkCards={homeworkCards}
          />
        </Col>
        <Col span={4}>
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
        </Col>
      </Row>
    </PageLayout>
  );
};
