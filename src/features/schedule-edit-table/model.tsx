import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { createEvent } from "effector";
import uuid from "react-uuid";
import { ExtendedScheduleDataType } from "../schedule-table/api/types";
import { $columns, $schedule } from "../schedule-table/model";

export const editScheduleRow = createEvent<ExtendedScheduleDataType>();
export const deleteScheduleRow = createEvent<string>();
export const addScheduleRow = createEvent<ExtendedScheduleDataType>();

const handleDelete = (id: string) => {
  deleteScheduleRow(id);
};

$schedule
  .on(editScheduleRow, (state, payload) =>
    state.map((lesson) => {
      if (lesson.id === payload.id) {
        if (payload.homework) {
          return lesson.homeworkId
            ? { ...payload, homeworkId: lesson.homeworkId }
            : { ...payload, homeworkId: uuid() };
        }
        return payload;
      }
      return lesson;
    })
  )
  .on(deleteScheduleRow, (state, payload) => {
    const filteredState = state.filter((lesson) => lesson.id !== payload);
    return filteredState.map((row, index) => ({ ...row, key: index + 1 }));
  })
  .on(addScheduleRow, (state, payload) => [...state, payload]);

export const $defaultEditableColumns = $columns.map((columns) => {
  const defaultEditableColumns = columns.map((column) => ({
    title: column.title,
    dataIndex: "dataIndex" in column ? column.dataIndex : undefined,
    render: column.render,
    editable: "dataIndex" in column ? column.dataIndex !== "key" : false,
  }));
  const additionalColumns = [
    { title: "Описание ДЗ", dataIndex: "homeworkDescription", editable: true },
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
  ];
  return [...defaultEditableColumns, ...additionalColumns];
});

export const $editableColumns = $defaultEditableColumns.map((columns) =>
  [...columns].map((col) => {
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
        handleSave: editScheduleRow,
      }),
      render:
        col.dataIndex === "homework" ||
        col.dataIndex === "homeworkDate" ||
        col.dataIndex === "homeworkDescription"
          ? (value: string) =>
              value ? (
                <div>{value}</div>
              ) : (
                <PlusSquareOutlined style={{ marginLeft: "auto" }} />
              )
          : col.render,
    };
  })
);
