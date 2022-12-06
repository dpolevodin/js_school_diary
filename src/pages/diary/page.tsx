import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const DiaryPage = () => {
  return (
    <Layout>
      <PageHeader title="Дневник" />
      <Content></Content>
    </Layout>
  );
};