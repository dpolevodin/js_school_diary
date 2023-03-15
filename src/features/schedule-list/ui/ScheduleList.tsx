import { useEffect } from "react";
import { useUnit } from "effector-react";
import { Table } from "antd";

import { $columns, $schedule, getDataEv } from "../model";

export const ScheduleList = () => {
  const [getData, schedule, columns] = useUnit([
    getDataEv,
    $schedule,
    $columns,
  ]);
  useEffect(() => getData(), []);

  return (
    <Table columns={columns} dataSource={schedule} onChange={() => null} />
  );
};
