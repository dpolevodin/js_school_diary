/* eslint-disable react/jsx-props-no-spreading */
import { FormInstance, Form } from "antd";
import React from "react";
import { UserHomeworksPayloadType } from "../../lib/types";

export const DiaryEditableContext =
  React.createContext<FormInstance<UserHomeworksPayloadType> | null>(null);

export const DiaryEditableRow = ({ ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <DiaryEditableContext.Provider value={form}>
        <tr {...props} />
      </DiaryEditableContext.Provider>
    </Form>
  );
};
