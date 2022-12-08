import { Layout } from "antd";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const ScheduleCreatePage = () => (
  <Layout>
    <PageHeader title="Создание расписания" />
    <Content />
  </Layout>
);
