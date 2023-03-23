import { ContestsTable } from "../../features/contests-table/ContestsTable";
import { PageLayout } from "../../shared/ui";

const nav = ["admin", "schedule", "diary", "contests"];

export const ContestsPage = () => (
  <PageLayout title="Конкурсы" nav={nav}>
    <ContestsTable />
  </PageLayout>
);
