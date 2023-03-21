import { DatePicker, Form, Layout, Space, Typography } from "antd";
import { useUnit } from "effector-react";
import dayjs from "dayjs";
import { ScheduleTable } from "../../../features/schedule-table/ScheduleTable";
import { PageLayout } from "../../../shared/ui";
import { AddScheduleForm } from "../../../features/add-schedule-form/AddScheduleForm";
import {
  $editingKey,
  $schedule,
  addScheduleRow,
  deleteSchedule,
  saveData,
  Schedule,
  setEditingKey,
} from "./model";
import { $tutors } from "../../admin/model";

import styles from "./page.module.css";

const { Content } = Layout;
export const ScheduleEditPage = () => {
  const [
    addScheduleRowFn,
    deleteScheduleFn,
    schedule,
    tutors,
    saveDataFn,
    editingKey,
    setEditingKeyFn,
  ] = useUnit([
    addScheduleRow,
    deleteSchedule,
    $schedule,
    $tutors,
    saveData,
    $editingKey,
    setEditingKey,
  ]);

  const [form] = Form.useForm();

  const isEditing = (store: Schedule) => store.key === editingKey;

  const edit = (store: Partial<Schedule> & { key?: string }) => {
    form.setFieldsValue({
      number: "",
      date: "",
      block: "",
      theme: "",
      slotThemes: {
        theme1: "",
        theme2: "",
        theme3: "",
      },
      teacher: "",
      homework: {
        homeworkNumber: "",
        deadline: "",
      },
      ...store,
    });
    setEditingKeyFn(typeof store.key === "string" ? store.key : "");
  };

  const cancel = () => {
    setEditingKeyFn("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Schedule;

      const newData = [...schedule];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        saveDataFn(newData);
        setEditingKeyFn("");
      } else {
        newData.push(row);
        saveDataFn(newData);
        setEditingKeyFn("");
      }
    } catch (errInfo) {
      // console.log('Validate Failed:', errInfo);
    }
  };

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

  const columnsSchedule = [
    {
      title: "Номер",
      dataIndex: "number",
      key: "number",
      editable: false,
    },
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
      render: (date: string) => (
        <DatePicker
          bordered={false}
          defaultValue={dayjs(date, "YYYY-MM-DD")}
          disabled
        />
      ),
      editable: true,
      width: "14%",
    },
    {
      title: "Блок",
      dataIndex: "block",
      key: "block",
      editable: true,
      width: "14%",
      filters: [
        {
          text: "HTML/CSS",
          value: "HTML/CSS",
        },
        {
          text: "Java Script",
          value: "Java Script",
        },
        {
          text: "React",
          value: "React",
        },
      ],
      onFilter: (value: string, record: Schedule) =>
        record.block.indexOf(value) === 0,
      sorter: (a: Schedule, b: Schedule) => a.block.length - b.block.length,
    },
    {
      title: "Тема",
      dataIndex: "theme",
      key: "theme",
      editable: true,
      width: "14%",
    },
    {
      title: "Темы слотов",
      dataIndex: "slotThemes",
      key: "slotThemes",
      render: (slotThemes: { [key: string]: string }) => (
        <Space direction="vertical" size="middle">
          {Object.values(slotThemes).map((theme) => (
            <span key={theme}>{theme}</span>
          ))}
        </Space>
      ),
      editable: true,
      width: "14%",
    },
    {
      title: "Преподаватель",
      dataIndex: "teacher",
      key: "teacher",
      editable: true,
      width: "14%",
      filters: [
        {
          text: "Сергей Махнаткин",
          value: "Сергей Махнаткин",
        },
        {
          text: "Махнаткин Сергей",
          value: "Махнаткин Сергей",
        },
      ],
      onFilter: (value: string, record: Schedule) =>
        record.teacher.indexOf(value) === 0,
      sorter: (a: Schedule, b: Schedule) => a.teacher.length - b.teacher.length,
      sortDirections: ["descend"],
    },
    {
      title: "ДЗ",
      dataIndex: "homework",
      key: "homework",
      render: (homework: { [key: string]: string }) => (
        <div>
          <p>Сделать {homework.homeworkNumber} </p>
          <p>до {homework.deadline}</p>
        </div>
      ),
      editable: true,
      width: "14%",
    },
    {
      title: "Действия",
      dataIndex: "operation",
      width: "12%",
      render: (_: Schedule, store: Schedule) => {
        const editable = isEditing(store);
        return editable ? (
          <Space direction="vertical">
            <Typography.Link
              onClick={() =>
                typeof store.key === "string" ? save(store.key) : null
              }
            >
              Сохранить
            </Typography.Link>
            <Typography.Link onClick={() => cancel()}>Отмена</Typography.Link>
          </Space>
        ) : (
          <Space direction="vertical">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() =>
                typeof store.key === "string" ? edit(store) : null
              }
            >
              Редактировать
            </Typography.Link>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() =>
                typeof store.key === "string"
                  ? deleteScheduleFn(store.key)
                  : null
              }
            >
              Удалить
            </Typography.Link>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columnsSchedule.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (store: Schedule) => ({
        store,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(store),
      }),
    };
  });

  const nav = ["admin", "schedule", "diary", "contests"];

  return (
    <PageLayout title="Редактирование расписания" nav={nav}>
      <Content>
        <Space direction="vertical" className={styles._} size="large">
          <ScheduleTable
            scheduleStore={schedule}
            columns={mergedColumns}
            form={form}
          />
          <AddScheduleForm
            schedule={schedule}
            handleClickAddScheduleRow={(value: Schedule) =>
              addScheduleRowFn(value)
            }
            teacherOptions={TEACHER_MAP}
            blockOptions={BLOCK_MAP}
          />
        </Space>
      </Content>
    </PageLayout>
  );
};
