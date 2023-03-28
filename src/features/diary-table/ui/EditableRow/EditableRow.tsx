import React from "react";
import { Form } from "antd";
import type { FormInstance } from "antd/es/form";
import { User } from "../../../../pages/sign/signUp/lib/types";

const EditableContext = React.createContext<FormInstance<User> | null>(null);

interface EditableRowProps {
  index: number;
}

export const EditableRow: React.FC<EditableRowProps> = () => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        {/* <tr {...props} /> */}
      </EditableContext.Provider>
    </Form>
  );
};
