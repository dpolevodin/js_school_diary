import type { ColumnsType } from "antd/es/table";
import { User } from "../lib/types";
import { $schedule, updateUser } from "../../../mocks/mocks";

const $defaultPointColumns = $schedule.map<
  ColumnsType<User> &
    {
      editable?: boolean;
      dataIndex: string | string[];
    }[]
>((schedule) => {
  const defaultPointColumns = schedule.map((lesson) => ({
    title: lesson.theme,
    dataIndex: ["points", lesson.date as string],
    editable: true,
  }));
  const studentColumn = {
    title: "Студент",
    dataIndex: "surname",
    width: "20%",
    render: (_: string, record: User) => (
      <div>{`${record.surname} ${record.name}`}</div>
    ),
  };
  const totalColumn = { title: "Итого", dataIndex: ["points", "total"] };

  return [studentColumn, ...defaultPointColumns, totalColumn];
});

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
        handleSave: updateUser,
      }),
    };
  })
);
