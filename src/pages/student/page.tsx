import { Link } from "atomic-router-react";
import { Card, Col, Layout, Row, Space, Typography } from "antd";
import { useUnit } from "effector-react";
import { SettingOutlined } from "@ant-design/icons";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";
import { routes } from "../../shared/lib/atomic-router/route";
import { $user } from "./model";
import { homeworkCards } from "./settings/mocks";
import styles from "./page.module.css";

const { Content } = Layout;
const { Text, Title } = Typography;

export const StudentPage = () => {
  const [user] = useUnit([$user]);

  return (
    <Layout>
      <PageHeader title="Личный кабинет" />
      <Content className={styles._}>
        <Row>
          <Space size={100}>
            <Col span={24}>
              <Title className={styles.title}>
                Привет, {user.name} {user.surname} ({user.nickName})
              </Title>
              <Title level={3}>Оценки за дз</Title>
              <Card className={styles.cardBody}>
                {homeworkCards.map((card) => (
                  <Card.Grid key={card.deadline} className={styles.gridStyle}>
                    <Text
                    // type={card.homeworkStatus}
                    >
                      {card.homework}
                    </Text>
                  </Card.Grid>
                ))}
              </Card>
              <Row gutter={20}>
                {homeworkCards.map((card) => (
                  <Col key={card.deadline} className={styles.gridStyle}>
                    <div>{card.homeworkStatus ? "" : card.deadline}</div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={24}>
              <Space size={10} direction="vertical">
                <Link className={styles.button} to={routes.studentSettings}>
                  <Text>
                    <SettingOutlined className={styles.icon} />
                  </Text>
                </Link>
                <Link to={`https://t.me/${user.settings?.tgNickName.slice(1)}`}>
                  <u>tg: {user.settings?.tgNickName || "nickname"}</u>
                </Link>
                <Link
                  to={`https://github.com/${user.settings?.githubNickName}`}
                >
                  <u>github: {user.settings?.githubNickName || "nickname"}</u>
                </Link>
                <Link
                  to={`${
                    user.settings?.htmlRepository !== ""
                      ? `https://github.com/${user.settings?.githubNickName}/${user.settings?.htmlRepository}`
                      : routes.studentSettings
                  }`}
                >
                  <u>{user.settings?.htmlRepository || "repository html"}</u>
                </Link>
                <Link
                  to={`https://github.com/${user.settings?.githubNickName}/${user.settings?.reactRepository}`}
                >
                  <u>{user.settings?.reactRepository || "repository react"}</u>
                </Link>
              </Space>
            </Col>
          </Space>
        </Row>
      </Content>
    </Layout>
  );
};
