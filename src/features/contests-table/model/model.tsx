import type { ColumnsType } from "antd/es/table";

import { User } from "../../../pages/sign/signUp/lib/types";
import { updateUser } from "../../../pages/sign/signUp/model";
import { $schedule } from "../../schedule-table/model";

const $defaultPointColumns = $schedule.map<
  ColumnsType<User> &
    {
      editable?: boolean;
      dataIndex: string | string[];
    }[]
>((schedule) => [
  {
    title: "Студент",
    dataIndex: "surname",
    width: "20%",
    render: (_: string, record) => (
      <div>{`${record.surname} ${record.name}`}</div>
    ),
  },
  ...schedule.map((lesson) => ({
    title: lesson.theme,
    dataIndex: ["points", lesson.date as string],
    editable: true,
  })),
  { title: "Итого", dataIndex: ["points", "total"] },
]);

const handleSave = (row: User) => {
  updateUser(row);
};

export const $pointsColumns = $defaultPointColumns.map((columns) =>
  columns.map((col) => {
    if (!("editable" in col) || !("dataIndex" in col)) {
      return col;
    }
    return {
      ...col,
      onCell: (record: User) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  })
);
