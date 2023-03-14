import { useEffect } from "react";
import { useUnit } from "effector-react";
import { Spin, Typography } from "antd";
import {
  $session,
  getSessionFx,
  pageMounted,
} from "../../entities/auth/session";
import { PageLayout } from "../../shared/ui";
import styles from "./page.module.css";

const { Title, Paragraph } = Typography;
const nav = ["admin", "signIn", "signUp", "schedule", "diary", "contests"];

export const HomePage = () => {
  const [session, pageMountedFn, loading] = useUnit([
    $session,
    pageMounted,
    getSessionFx.pending,
  ]);
  useEffect(() => {
    if (!session) pageMountedFn();
  }, [session, pageMountedFn]);

  return (
    <PageLayout title="Школа JS" nav={nav}>
      <Spin size="large" spinning={loading}>
        <Typography>
          <Title className={styles.title}>
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
      </Spin>
    </PageLayout>
  );
};
