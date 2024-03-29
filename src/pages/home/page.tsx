import { Typography } from "antd";
import { PageLayout } from "../../shared/ui";
import styles from "./page.module.css";

const { Title, Paragraph } = Typography;
const nav = ["admin", "signIn", "signUp", "schedule", "diary", "contests"];

export const HomePage = () => (
  <PageLayout title="Школа JS" nav={nav} isAccessFree>
    <Typography>
      <Title className={styles.title}>Школа JavaScript поток – 2023.03</Title>
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
