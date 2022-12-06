import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const StudentPage = () => {
  return (
    <Layout>
      <PageHeader title="Личный кабинет" />
      <Content></Content>
    </Layout>
  );
};
