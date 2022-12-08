import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const AdminPage = () => (
  <Layout>
    <PageHeader title="Настройки курса" />
    <Content />
  </Layout>
);
