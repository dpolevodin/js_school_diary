/* eslint-disable react/jsx-props-no-spreading */
import { Form, FormInstance } from "antd";
import { createContext } from "react";
import { ExtendedScheduleDataType } from "../../../schedule-table/api/types";

interface EditableRowProps {
  index: number;
}

export const SchedualeEditableContext =
  createContext<FormInstance<ExtendedScheduleDataType> | null>(null);

export const SchedualeEditableRow = ({ index, ...props }: EditableRowProps) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <SchedualeEditableContext.Provider value={form}>
        <tr {...props} />
      </SchedualeEditableContext.Provider>
    </Form>
  );
};
