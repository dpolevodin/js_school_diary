import { Link } from "atomic-router-react";
import {
  Card,
  Col,
  Layout,
  Row,
  Space,
  Typography
} from "antd";
import { useUnit } from "effector-react";
import { SettingOutlined } from "@ant-design/icons";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";
import { routes } from "../../shared/lib/atomic-router/route";
import {
  $user,
  $userSettings
} from "./model";
import { homeworkCards } from "./settings/mocks";
import styles from "./page.module.css";

const { Content } = Layout;
const { Text ,Title } = Typography;

export const StudentPage = () => {
  const [
    user,
    userSettings
  ] = useUnit([
    $user,
    $userSettings
  ]);

  return (
  <Layout>
    <PageHeader title="Личный кабинет" />
    <Content className={styles._}>
      <Row>
        <Space size={100}>
          <Col span={50}>
            <Title className={styles.title}>Привет, {user.name} {user.surname} ({user.nickName})</Title>
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
                <div>{card.homeworkStatus ? '' : card.deadline}</div>
              </Col>
              ))}
            </Row>
          </Col>
          <Space size={10} className={styles.links} direction="vertical">
            <Link className={styles.button} to={routes.studentSettings} >
              <Text><SettingOutlined  className={styles.icon}/></Text>
            </Link>
            <Link to={`https://t.me/${userSettings.tgNickName.slice(1)}`} ><u>tg: {userSettings.tgNickName || 'nickname'}</u></Link>
            <Link to={`https://github.com/${userSettings.githubNickName}`} ><u>github: {userSettings.githubNickName || 'nickname'}</u></Link>
            <Link to={routes.studentSettings} ><u>{userSettings.htmlRepository || 'repository html'}</u></Link>
            <Link to={routes.studentSettings} ><u>{userSettings.reactRepository || 'repository react'}</u></Link>
          </Space>
        </Space>
      </Row>
    </Content>
  </Layout>
)};