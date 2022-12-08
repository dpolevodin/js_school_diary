import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const DiaryPage = () => (
  <Layout>
    <PageHeader title="Дневник" />
    <Content />
  </Layout>
);
