import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const AdminPage = () => {
  return (
    <Layout>
      <PageHeader title="Настройки курса" />
      <Content></Content>
    </Layout>
  );
};
