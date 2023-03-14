import { PageLayout } from "../../shared/ui";

const nav = ["admin", "schedule", "diary", "contests"];

export const SchedulePage = () => (
  <PageLayout title="Расписание занятий" nav={nav} />
);
