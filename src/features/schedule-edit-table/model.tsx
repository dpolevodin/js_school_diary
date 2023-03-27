import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { createEvent } from "effector";
import { ExtendedScheduleDataType } from "../schedule-table/api/types";
import { $columns, $schedule } from "../schedule-table/model";

export const editScheduleRow = createEvent<ExtendedScheduleDataType>();
export const deleteScheduleRow = createEvent<string>();
export const addScheduleRow = createEvent<ExtendedScheduleDataType>();

$schedule
  .on(editScheduleRow, (state, payload) =>
    state.map((lesson) => (lesson.id === payload.id ? payload : lesson))
  )
  .on(deleteScheduleRow, (state, payload) => {
    const filteredState = state.filter((lesson) => lesson.id !== payload);
    return filteredState.map((row, index) => ({ ...row, key: index + 1 }));
  })
  .on(addScheduleRow, (state, payload) => [...state, payload]);

export const $defaultEditableColumns = $columns.map((columns) =>
  columns.map((column) => ({
    title: column.title,
    dataIndex: "dataIndex" in column ? column.dataIndex : undefined,
    render: column.render,
    editable: "dataIndex" in column ? column.dataIndex !== "key" : false,
  }))
);

const handleSave = (row: ExtendedScheduleDataType) => {
  editScheduleRow(row);
};
const handleDelete = (id: string) => {
  deleteScheduleRow(id);
};

export const $editableColumns = $defaultEditableColumns.map((columns) =>
  [
    ...columns,
    {
      title: "Удалить",
      dataIndex: "delete",
      align: "center",
      render: (
        dataSource: ExtendedScheduleDataType[],
        record: { id: string }
      ) => (
        <Popconfirm title="Удалить?" onConfirm={() => handleDelete(record.id)}>
          <DeleteOutlined />
        </Popconfirm>
      ),
    },
  ].map((col) => {
    if (!("editable" in col) || !("dataIndex" in col)) {
      return col;
    }
    return {
      ...col,
      onCell: (record: ExtendedScheduleDataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  })
);
