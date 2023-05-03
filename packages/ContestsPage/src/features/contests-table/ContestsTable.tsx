import { Table } from "antd";
import { useUnit } from "effector-react";
import { $pointsColumns } from "./model/model";
import { EditableRow, EditableCell } from "./ui";
import { $users } from "../../mocks/mocks";

export const ContestsTable = () => {
  const [users, pointsColumns] = useUnit([$users, $pointsColumns]);

  type EditableTableProps = Parameters<typeof Table>[0];
  type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  return (
    <Table
      components={components}
      rowClassName={() => "editable-row"}
      bordered
      dataSource={users}
      columns={pointsColumns as ColumnTypes}
      pagination={false}
      rowKey="id"
    />
  );
};
