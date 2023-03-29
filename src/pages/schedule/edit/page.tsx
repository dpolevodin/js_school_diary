import { SchedualeEditTable } from "../../../features/schedule-edit-table/ScheduleEditTable";
import { PageLayout } from "../../../shared/ui";

export const ScheduleEditPage = () => {
  const nav = ["admin", "schedule", "diary", "contests"];

  return (
    <PageLayout title="Редактирование расписания" nav={nav}>
      <SchedualeEditTable />
    </PageLayout>
  );
};
