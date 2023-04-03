/* eslint-disable react/jsx-props-no-spreading */
import { InputRef, Form, Input } from "antd";
import { useState, useRef, useContext, useEffect } from "react";
import { EditableContext } from "../EditableRow/EditableRow";

type DataType = {
  key: string;
  student: string;
  points: {
    [key: string]: number;
  };
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof DataType;
  record: DataType;
  handleSave: (record: DataType) => void;
}

export const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: EditableCellProps) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext);

  useEffect(() => {
    if (editing) {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    const initialValues = Object.keys(record.points).reduce(
      (acc, key) => ({ ...acc, [key]: record.points[key] }),
      {}
    );
    form?.setFieldsValue(initialValues);
  };

  const savePoints = async () => {
    try {
      const value = await form?.validateFields();
      const newCurrentPoint = value?.points
        ? (value?.points[dataIndex[1]] as number)
        : 0;
      const newPoints = { ...record.points, [dataIndex[1]]: newCurrentPoint };
      const newTotal = Object.keys(newPoints).reduce((acc, item) => {
        if (item !== "total") {
          return acc + +newPoints[item];
        }
        return acc;
      }, 0);
      newPoints.total = newTotal;
      toggleEdit();
      handleSave({ ...record, points: newPoints });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={savePoints} onBlur={savePoints} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
        onKeyUp={toggleEdit}
        tabIndex={0}
        role="button"
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
