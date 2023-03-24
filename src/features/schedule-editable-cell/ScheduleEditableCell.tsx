import React from "react";
import { useUnit } from "effector-react";
import { DatePicker, Input, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import { $tutors } from "../../pages/admin/model";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string | { [key: string]: string };
  children: React.ReactNode;
}
export const ScheduleEditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  children,
}) => {
  const [tutors] = useUnit([$tutors]);

  const TEACHER_MAP = tutors.map((tutor) => ({
    value: tutor.fullName,
    label: tutor.fullName,
  }));
  const BLOCK_MAP = [
    {
      value: "HTML/CSS",
      label: "HTML/CSS",
    },
    {
      value: "Java Script",
      label: "Java Script",
    },
    {
      value: "React",
      label: "React",
    },
  ];

  const dataObject =
    dataIndex === "slotThemes" ? (
      <>
        <FormItem noStyle name={["slotThemes", "theme1"]}>
          <Input />
        </FormItem>
        <FormItem noStyle name={["slotThemes", "theme2"]}>
          <Input />
        </FormItem>
        <FormItem noStyle name={["slotThemes", "theme3"]}>
          <Input />
        </FormItem>
      </>
    ) : (
      <>
        <FormItem noStyle name={["homework", "homeworkNumber"]}>
          <Input />
        </FormItem>
        <FormItem noStyle name={["homework", "deadline"]}>
          <Input />
        </FormItem>
      </>
    );

  const InputTypeSelect =
    dataIndex === "block" || dataIndex === "teacher" ? (
      <Select options={dataIndex === "block" ? BLOCK_MAP : TEACHER_MAP} />
    ) : (
      <Input />
    );
  const inputType = dataIndex === "date" ? <DatePicker /> : InputTypeSelect;

  const data =
    dataIndex === "slotThemes" || dataIndex === "homework"
      ? dataObject
      : inputType;

  return (
    <td>
      {editing ? (
        <FormItem name={typeof dataIndex === "object" ? undefined : dataIndex}>
          {data}
        </FormItem>
      ) : (
        children
      )}
    </td>
  );
};
