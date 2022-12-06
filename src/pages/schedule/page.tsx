import { Layout } from "antd";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const SchedulePage = () => {
  return (
    <Layout>
      <PageHeader title="Расписание занятий" />
      <Content></Content>
    </Layout>
  );
};
