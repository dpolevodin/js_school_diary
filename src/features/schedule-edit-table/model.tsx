import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { ExtendedScheduleDataType } from "../schedule-table/api/types";
import {
  $columns,
  deleteScheduleRow,
  editScheduleRow,
} from "../schedule-table/model";

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
    return col.dataIndex === "homework" || col.dataIndex === "homeworkDate"
      ? {
          ...col,
          onCell: (record: ExtendedScheduleDataType) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
          }),
          render: (value: string) =>
            value ? (
              <div>{value}</div>
            ) : (
              <PlusSquareOutlined style={{ marginLeft: "auto" }} />
            ),
        }
      : {
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
