import { Layout } from "antd";
import { ScheduleList } from "../../features/schedule-list/ui/ScheduleList";
import { PageHeader } from "../../shared/ui/PageHeader/PageHeader";

const { Content } = Layout;

export const SchedulePage = () => (
  <Layout>
    <PageHeader title="Расписание занятий" />
    <Content>
      <ScheduleList />
    </Content>
  </Layout>
);
