import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const ContestsPage = () => (
  <Layout>
    <PageHeader title="Конкурсы" />
    <Content />
  </Layout>
);
