/* eslint-disable react/jsx-props-no-spreading */
import { InputRef, Form, Input, DatePicker, Select, message } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useUnit } from "effector-react";
import type { BaseSelectRef } from "rc-select";
import { PickerProps } from "antd/es/date-picker/generatePicker";
import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";
import { useState, useRef, useContext, useEffect, Component } from "react";
import { SchedualeEditableContext } from "../SchedualeEditableRow/SchedualeEditableRow";
import {
  $additionalDates,
  $availableDays,
  $blocks,
  $forbiddenDates,
  $tutors,
} from "../../../../pages/admin/model";
import { ExtendedScheduleDataType } from "../../../schedule-table/api/types";
import styles from "../../ScheduleEditTable.module.css";

const { TextArea } = Input;

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof ExtendedScheduleDataType;
  record: ExtendedScheduleDataType;
  handleSave: (record: ExtendedScheduleDataType) => void;
}

function isDayjs(value: string | Dayjs | number | string[]): value is Dayjs {
  return dayjs.isDayjs(value);
}

export const SchedualeEditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}: EditableCellProps) => {
  const [blocks, tutors, availableDays, forbiddenDates, additionalDates] =
    useUnit([
      $blocks,
      $tutors,
      $availableDays,
      $forbiddenDates,
      $additionalDates,
    ]);
  const blocksOptions = blocks.map(({ name }) => ({
    value: name,
    label: name,
  }));
  const tutorsOptions = tutors.map(({ fullName }) => ({
    value: fullName,
    label: fullName,
  }));
  const [messageApi, contextHolder] = message.useMessage();
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const datePickerRef = useRef<
    Component<
      PickerProps<Dayjs> & {
        status?: "" | "warning" | "error" | undefined;
        hashId?: string | undefined;
        popupClassName?: string | undefined;
      },
      unknown
    >
  >(null);
  const selectRef = useRef<BaseSelectRef>(null);
  const form = useContext(SchedualeEditableContext);

  useEffect(() => {
    if (editing) {
      if (inputRef?.current) {
        inputRef.current.focus();
      }
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form?.setFieldsValue({
      ...record,
      date: dayjs(record.date, "DD.MM.YYYY"),
      homeworkDate: record.homeworkDate
        ? dayjs(record.homeworkDate, "DD.MM.YYYY")
        : "",
    });
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
      const value = await form?.validateFields();
      toggleEdit();
      handleSave({ ...record, ...value });
    } catch (errInfo) {
      showError(errInfo);
    }
  };

  const saveDate = async () => {
    try {
      const value = await form?.validateFields();
      const parsedValue = value
        ? {
            [Object.keys(value)[0]]: isDayjs(Object.values(value)[0])
              ? (Object.values(value)[0] as Dayjs).format("DD.MM.YYYY")
              : Object.values(value)[0],
          }
        : {};
      toggleEdit();
      handleSave({ ...record, ...parsedValue });
    } catch (errInfo) {
      showError(errInfo);
    }
  };

  const saveSlots = async () => {
    try {
      const value = await form?.validateFields();
      const parsedValue = value
        ? {
            themeSlots: Array.isArray(value.themeSlots)
              ? value.themeSlots
              : value.themeSlots.split(","),
          }
        : {};
      toggleEdit();
      handleSave({ ...record, ...parsedValue });
    } catch (errInfo) {
      showError(errInfo);
    }
  };

  let childNode = children;

  dayjs.extend(customParseFormat);

  const dateFormat = "DD.MM.YYYY";

  const DatePickerComp = (
    <Form.Item
      name={dataIndex}
      rules={[
        {
          required: true,
          message: `${title} is required.`,
        },
      ]}
    >
      <DatePicker
        ref={datePickerRef}
        locale={locale}
        disabledDate={(current) =>
          (!availableDays.includes(current.day()) ||
            forbiddenDates.includes(current.format("YYYY-MM-DD"))) &&
          !additionalDates.includes(current.format("YYYY-MM-DD"))
        }
        format={dateFormat}
        onChange={saveDate}
        onBlur={saveDate}
      />
    </Form.Item>
  );

  const BlocksSelect = (
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
        placeholder="block"
        ref={selectRef}
        options={blocksOptions}
        onBlur={save}
        onChange={save}
      />
    </Form.Item>
  );

  const TutorsSelect = (
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
      <Select
        placeholder="block"
        ref={selectRef}
        options={tutorsOptions}
        onBlur={save}
        onChange={save}
      />
    </Form.Item>
  );

  const DatePickerDeadlineComp = (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[
        {
          required: false,
          message: `${title} is required.`,
        },
      ]}
    >
      <DatePicker
        ref={datePickerRef}
        format={dateFormat}
        locale={locale}
        onChange={saveDate}
        onBlur={saveDate}
      />
    </Form.Item>
  );

  const InputComp = (
    <Form.Item
      style={{ margin: 0 }}
      name={dataIndex}
      rules={[
        {
          required:
            dataIndex !== "homework" && dataIndex !== "homeworkDescription",
          message: `${title} is required.`,
        },
      ]}
    >
      {dataIndex === "homeworkDescription" ? (
        <TextArea rows={5} ref={inputRef} onPressEnter={save} onBlur={save} />
      ) : (
        <Input
          ref={inputRef}
          onPressEnter={dataIndex === "themeSlots" ? saveSlots : save}
          onBlur={dataIndex === "themeSlots" ? saveSlots : save}
        />
      )}
    </Form.Item>
  );
  if (editable) {
    childNode = editing ? (
      (() => {
        switch (dataIndex) {
          case "date":
            return DatePickerComp;
            break;
          case "block":
            return BlocksSelect;
            break;
          case "teacher":
            return TutorsSelect;
            break;
          case "homeworkDate":
            return DatePickerDeadlineComp;
            break;
          default:
            return InputComp;
        }
      })()
    ) : (
      <div
        className={styles.editableCell}
        onClick={toggleEdit}
        onKeyUp={toggleEdit}
        tabIndex={0}
        role="button"
      >
        {children &&
        dataIndex === "homeworkDescription" &&
        record.homeworkDescription
          ? record?.homeworkDescription?.slice(0, 10)
          : children}
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
