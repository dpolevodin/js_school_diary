import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";
import { routes } from "../../shared/lib/atomic-router/route";
import { Link } from "atomic-router-react";
import {
  Button,
  Card,
  Col,
  Layout,
  Row,
  Space,
  Typography
} from "antd";
import { useUnit } from "effector-react";
import { SettingOutlined } from "@ant-design/icons";
import {
  $userFullName,
  $telegramNickName,
  $githubNickName,
  $login,
  $repositoryHtml,
  $repositoryReact,
  
} from "./model";

const { Content } = Layout;
const { Text ,Title } = Typography;

const gridStyle: React.CSSProperties = {
  width: '10rem',
  height: '3rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'

};

import {
  homeworkCards,
  HomeworkCards
} from "./settings/mocks";
import "./page.css";

export const StudentPage = () => {
  const [
    userFullName,
    telegramNickName,
    githubNickName,
    login,
    repositoryHtml,
    repositoryReact
  ] = useUnit([
    $userFullName,
    $telegramNickName,
    $githubNickName,
    $login,
    $repositoryHtml,
    $repositoryReact
  ]);

  return (
  <Layout>
    <PageHeader title="Личный кабинет" />
    <Content className="Content">
      <Row>
        <Space size={100}>
          <Col span={25}>
            <Title className="Typography__title">Привет, {userFullName} ({login})</Title>
            <Title level={3}>Оценки за дз</Title>
            <Card>
              {/* <Card.Grid style={gridStyle}><Text>Дз 1</Text></Card.Grid>
              <Card.Grid hoverable={false} style={gridStyle}>
                <Text>Дз 2</Text>
              </Card.Grid>
              <Card.Grid style={gridStyle}><Text>Дз 3</Text></Card.Grid>
              <Card.Grid style={gridStyle}><Text>Дз 4</Text></Card.Grid>
              <Card.Grid style={gridStyle}><Text>Дз 5</Text></Card.Grid> */}
              {homeworkCards.map((card) => (
                <Card.Grid key={card.deadline} style={gridStyle}>
                  <Text type={card.homeworkStatus}>{card.homework}</Text>
                </Card.Grid>
              ))}
            </Card>
          </Col>
          <Space direction="vertical">
            <Link to={routes.studentSettings} >
              <Button
                style={{ width: '4rem', height: '4rem' }}
                type="text"
                block
                htmlType="button"
                icon={<SettingOutlined style={{ fontSize: '3rem' }} />}
              />
            </Link>
            <Link to={`https://t.me/${telegramNickName.slice(1)}`} ><u>{telegramNickName || 'tg'}</u></Link>
            <Link to={`https://github.com/${githubNickName}`} ><u>{githubNickName|| 'github nickname'}</u></Link>
            <Link to={routes.studentSettings} ><u>{repositoryHtml || 'repository html'}</u></Link>
            <Link to={routes.studentSettings} ><u>{repositoryReact || 'repository react'}</u></Link>
          </Space>
        </Space>
      </Row>
    </Content>
  </Layout>
)};