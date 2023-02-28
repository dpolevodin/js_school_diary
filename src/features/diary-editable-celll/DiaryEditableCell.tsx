import React from "react";
import { Input, Select, Space } from "antd";
import FormItem from "antd/es/form/FormItem";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  children: React.ReactNode;
}
export const DiaryEditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  children,
}) => {
  const COLOR_MAP = [
    {
      value: "green",
      label: "Зачет",
    },
    {
      value: "yellow",
      label: "Незачет",
    },
  ];

  return (
    <td>
      {editing ? (
        <Space>
          <FormItem noStyle name={[dataIndex, "color"]}>
            <Select
              size="small"
              style={{ width: "100%" }}
              bordered={false}
              options={COLOR_MAP}
            />
          </FormItem>
          <FormItem noStyle name={[dataIndex, "homeworkNumber"]}>
            <Input size="small" style={{ width: "3rem" }} />
          </FormItem>
        </Space>
      ) : (
        children
      )}
    </td>
  );
};
