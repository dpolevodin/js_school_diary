import { PageLayout } from "../../shared/ui";

const nav = ["home", "admin", "schedule", "diary", "contests"];

export const SchedulePage = () => (
  <PageLayout title="Расписание занятий" nav={nav} />
);
