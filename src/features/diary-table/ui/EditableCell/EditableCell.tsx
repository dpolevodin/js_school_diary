import React from "react";
import { Select } from "antd";
import FormItem from "antd/es/form/FormItem";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editable: boolean;
  dataIndex: string;
  children: React.ReactNode;
}
export const EditableCell: React.FC<EditableCellProps> = ({
  editable,
  dataIndex,
  children,
}) => (
  <td>
    {editable ? (
      <FormItem noStyle name={[dataIndex, "status"]}>
        <Select
          key={dataIndex}
          style={{ width: 150 }}
          options={[
            { value: "approved", label: "Зачет" },
            { value: "pending", label: "Выполняется" },
            { value: "rejected", label: "Незачет" },
            { value: "default", label: "Не выбрано" },
          ]}
        />
      </FormItem>
    ) : (
      children
    )}
  </td>
);
