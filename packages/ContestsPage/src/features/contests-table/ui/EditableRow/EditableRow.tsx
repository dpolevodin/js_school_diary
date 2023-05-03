/* eslint-disable react/jsx-props-no-spreading */
import { Form, FormInstance } from "antd";
import { createContext } from "react";
import { User } from "../../lib/types";

interface EditableRowProps {
  index: number;
}

export const EditableContext = createContext<FormInstance<User> | null>(null);

export const EditableRow = ({ index, ...props }: EditableRowProps) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
