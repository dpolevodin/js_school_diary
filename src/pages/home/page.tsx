import { Typography } from "antd";

import "./page.css";
import { PageLayout } from "../../shared/ui";

const { Title, Paragraph } = Typography;

const nav = [
  "home",
  "admin",
  "signIn",
  "signUp",
  "schedule",
  "diary",
  "contests",
  "sberUniversity",
];

export const HomePage = () => (
  <PageLayout title="Школа JS" nav={nav}>
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
  </PageLayout>
);
