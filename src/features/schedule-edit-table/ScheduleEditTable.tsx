import { Button, Space, Table } from "antd";
import { useUnit } from "effector-react";
import uuid from "react-uuid";
import { $schedule } from "../schedule-table/model/index";
import { $editableColumns, addScheduleRow } from "./model";
import { SchedualeEditableRow, SchedualeEditableCell } from "./ui";
import styles from "./ScheduleEditTable.module.css";

export const SchedualeEditTable = () => {
  const [schedule, editableColumns, addScheduleRowFn] = useUnit([
    $schedule,
    $editableColumns,
    addScheduleRow,
  ]);
  const hadleClickAddRow = () =>
    addScheduleRowFn({
      key: schedule.length + 1,
      id: uuid(),
      date: "01.01.2023",
      block: "DOM 1",
      theme: "Тема 1",
      themeSlots: ["Тема слота 1", "Тема слота 2", "Тема слота 3"],
      teacher: "Преподаватель",
      homework: "ДЗ",
      homeworkDate: "02.01.2022",
    });

  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

  const components = {
    body: {
      row: SchedualeEditableRow,
      cell: SchedualeEditableCell,
    },
  };

  return (
    <Space direction="vertical" className={styles._}>
      <Button onClick={hadleClickAddRow} type="primary">
        Добавить занятие
      </Button>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={schedule}
        columns={editableColumns as ColumnTypes}
        pagination={false}
        rowKey="id"
      />
    </Space>
  );
};
