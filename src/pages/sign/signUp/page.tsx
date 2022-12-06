import { Layout } from "antd";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const SignUpPage = () => {
  return (
    <Layout>
      <PageHeader title="Регистрация" />
      <Content></Content>
    </Layout>
  );
};
