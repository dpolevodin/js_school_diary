/* eslint-disable */
import { Table } from "antd";
import { useUnit } from "effector-react";
import { $users, updateUser } from "../../pages/sign/signUp/model";
import { $studentDiary } from "../../pages/diary/model";
import { User } from "../../pages/sign/signUp/lib/types";
import { DiaryEditableRow } from "./ui/DiaryEditableRow/DiaryEditableRow";
import { DiaryEditableCell } from "./ui/DiaryEditableCell/DiaryEditableCell";
import { $diaryEditableColumns } from "./model";

type EditableTableProps = Parameters<typeof Table>[0];

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const DiaryTable = () => {
  const [updateUserFn, studentDiary, diaryEditableColumns] = useUnit([
    updateUser,
    $studentDiary,
    $diaryEditableColumns,
  ]);

  const components = {
    body: {
      row: DiaryEditableRow,
      cell: DiaryEditableCell,
    },
  };

  return (
    <div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        rowKey="id"
        bordered
        dataSource={studentDiary}
        columns={diaryEditableColumns as ColumnTypes}
        pagination={false}
      />
    </div>
  );
};
