import { Layout } from "antd";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const StudentSettingsPage = () => (
  <Layout>
    <PageHeader title="Настройки" />
    <Content />
  </Layout>
);
