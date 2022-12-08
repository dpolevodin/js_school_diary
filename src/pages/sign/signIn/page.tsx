import { Layout } from "antd";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const SignInPage = () => (
  <Layout>
    <PageHeader title="Вход" />
    <Content />
  </Layout>
);
