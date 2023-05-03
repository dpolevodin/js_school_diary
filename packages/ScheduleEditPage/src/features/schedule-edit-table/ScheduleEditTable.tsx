import { Button, Space, Table } from "antd";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { useUnit } from "effector-react";
import uuid from "react-uuid";
import dayjs from "dayjs";
import { $schedule } from "../../mocks/mocks";
import { $editableColumns, addScheduleRow, sortScheduleByDrag } from "./model";
import { SchedualeEditableRow, SchedualeEditableCell } from "./ui";
import styles from "./ScheduleEditTable.module.css";

export const SchedualeEditTable = () => {
  const [schedule, editableColumns, addScheduleRowFn, handleDragEnd] = useUnit([
    $schedule,
    $editableColumns,
    addScheduleRow,
    sortScheduleByDrag,
  ]);
  const hadleClickAddRow = () =>
    addScheduleRowFn({
      key: schedule.length + 1,
      id: uuid(),
      date: dayjs().format("DD.MM.YYYY"),
      block: "DOM 1",
      theme: "Тема 1",
      themeSlots: ["Тема слота 1", "Тема слота 2", "Тема слота 3"],
      teacher: "Преподаватель",
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
      <DndContext
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={schedule.map((c) => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={components}
            bordered
            dataSource={schedule}
            columns={editableColumns as ColumnTypes}
            pagination={false}
            rowKey="id"
          />
        </SortableContext>
      </DndContext>
    </Space>
  );
};
