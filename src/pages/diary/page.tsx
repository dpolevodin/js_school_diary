import { PageLayout } from "../../shared/ui";
import { DiaryTable } from "../../features/diary-table/DiaryTable";

const nav = ["admin", "schedule", "diary", "contests"];

export const DiaryPage = () => (
  <PageLayout title="Дневник" nav={nav}>
      <DiaryTable/>
  </PageLayout>
)