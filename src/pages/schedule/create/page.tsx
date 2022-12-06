import { Layout } from "antd";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const ScheduleCreatePage = () => {
  return (
    <Layout>
      <PageHeader title="Создание расписания" />
      <Content></Content>
    </Layout>
  );
};
