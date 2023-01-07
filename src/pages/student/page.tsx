import { PageLayout } from "../../shared/ui";

const nav = ["home", "student", "schedule"];

export const StudentPage = () => (
  <PageLayout title="Личный кабинет" nav={nav} />
);
