import { ScheduleTable } from "../../features/schedule-table/ui/ScheduleTable";
import { PageLayout } from "../../shared/ui";

const nav = ["admin", "schedule", "diary", "contests"];

export const SchedulePage = () => (
  <PageLayout title="Расписание занятий" nav={nav}>
    <ScheduleTable />
  </PageLayout>
);
