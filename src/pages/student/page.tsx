import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const StudentPage = () => (
  <Layout>
    <PageHeader title="Личный кабинет" />
    <Content />
  </Layout>
);
