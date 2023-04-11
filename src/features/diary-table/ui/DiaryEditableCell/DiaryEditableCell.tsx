/* eslint-disable react/jsx-props-no-spreading */
import { useState, useRef, useContext, useEffect } from "react";
import { Form, Select, message } from "antd";
import type { BaseSelectRef } from "rc-select";
import {
  HomeworksStatus,
  User,
  UserHomeworkType,
  UserHomeworksPayloadType,
} from "../../../../pages/sign/signUp/lib/types";
import { DiaryEditableContext } from "../DiaryEditableRow/DiaryEditableRow";
import styles from "./DiaryEditableCell.module.css";

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof User;
  record: UserHomeworksPayloadType;
  handleSave: (record: UserHomeworksPayloadType) => void;
}

export const DiaryEditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: EditableCellProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [editing, setEditing] = useState(false);
  const selectRef = useRef<BaseSelectRef>(null);
  const form = useContext(DiaryEditableContext);

  useEffect(() => {
    if (editing) {
      if (selectRef?.current) {
        selectRef.current.focus();
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form?.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const showError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : String(error);
    messageApi.open({
      type: "error",
      content: `Save failed: ${errorMessage}`,
    });
  };

  const save = async () => {
    try {
      const values = await form?.validateFields();
      toggleEdit();
      const homeworkId = Object.keys(values ?? {})[0];
      const newRecord = { ...record };
      newRecord[homeworkId as string] = {
        ...(newRecord[homeworkId as string] as UserHomeworkType),
        status: values?.[homeworkId] as HomeworksStatus | undefined,
      };
      handleSave(newRecord);
    } catch (errInfo) {
      showError(errInfo);
    }
  };

  const canсel = () => setEditing(!editing);

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Select
          options={[
            { value: "approved", label: "Зачет" },
            { value: "pending", label: "Выполняется" },
            { value: "rejected", label: "Незачет" },
            { value: "default", label: "Не выбрано" },
          ]}
          ref={selectRef}
          onChange={save}
          onBlur={canсel}
        />
      </Form.Item>
    ) : (
      <div
        className={styles.editableCell}
        onClick={toggleEdit}
        onKeyUp={toggleEdit}
        tabIndex={0}
        role="button"
      >
        {children}
      </div>
    );
  }

  return (
    <>
      {contextHolder}
      <td {...restProps}>{childNode}</td>
    </>
  );
};
