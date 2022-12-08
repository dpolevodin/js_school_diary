import { Link } from "atomic-router-react";
import { Col, Layout, Row, Space, Typography } from "antd";
import { routes } from "../../shared/lib/atomic-router/route";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";
import "./page.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const HomePage = () => (
  <Layout>
    <PageHeader title="Школа JS" />
    <Content className="Content">
      <Row>
        <Col span={18}>
          <Typography>
            <Title className="Typography__title">
              Школа JavaScript поток – 2023.03
            </Title>
            <Title level={3}>Кратко</Title>
            <Paragraph>Краткая информация о курсе что зачем, почему</Paragraph>
            <Title level={3}>Количество часов</Title>
            <Paragraph>Краткая информация о курсе</Paragraph>
            <Title level={3}>Про экзамен</Title>
            <Paragraph>Краткая информация про экзамен, ссылки разные</Paragraph>
            <Title level={3}>Про учебник</Title>
            <Paragraph>Краткая информация про экзамен, ссылки разные</Paragraph>
          </Typography>
        </Col>
        <Col span={6}>
          <Space direction="vertical" className="Navigation">
            <Link to={routes.admin}>
              <u>Настройки курса</u>
            </Link>
            <Link to={routes.contests}>
              <u>Конкурсы</u>
            </Link>
            <Link to={routes.diary}>
              <u>Дневник</u>
            </Link>
            <Link to={routes.schedule}>
              <u>Расписание занятий</u>
            </Link>
            <Link to={routes.scheduleEdit}>
              <u>Редактирование расписания</u>
            </Link>
            <Link to={routes.scheduleCreate}>
              <u>Создание расписания</u>
            </Link>
            <Link to={routes.signIn}>
              <u>Вход</u>
            </Link>
            <Link to={routes.signUp}>
              <u>Регистрация</u>
            </Link>
            <Link to={routes.student}>
              <u>Личный кабинет</u>
            </Link>
            <Link to={routes.studentSettings}>
              <u>Настройки</u>
            </Link>
            <Link to="https://sberuniversity.online/">
              <u>Сберуниверситет</u>
            </Link>
          </Space>
        </Col>
      </Row>
    </Content>
  </Layout>
);
