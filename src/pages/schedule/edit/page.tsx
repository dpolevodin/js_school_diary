import { PageLayout } from "../../../shared/ui";

const nav = ["home", "admin", "schedule", "diary", "contests"];

export const ScheduleEditPage = () => (
  <PageLayout title="Редактирование расписания" nav={nav} />
);
