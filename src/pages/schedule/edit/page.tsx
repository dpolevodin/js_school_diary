import { Layout } from "antd";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const ScheduleEditPage = () => {
  return (
    <Layout>
      <PageHeader title="Редактирование расписания" />
      <Content></Content>
    </Layout>
  );
};