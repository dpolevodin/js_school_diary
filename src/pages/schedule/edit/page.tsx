import { Layout } from "antd";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const ScheduleEditPage = () => (
  <Layout>
    <PageHeader title="Редактирование расписания" />
    <Content />
  </Layout>
);
