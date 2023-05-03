import { useUnit } from "effector-react";
import { Table } from "antd";

import { $columns, $schedule } from "../model";

export const ScheduleTable = () => {
  const [schedule, columns] = useUnit([$schedule, $columns]);

  return <Table columns={columns} dataSource={schedule} pagination={false} />;
};
