import React, { useState } from "react";
import { DatePicker, Form, Layout, Space, Tag, Typography } from "antd";
import { useUnit } from "effector-react";
import dayjs from "dayjs";
import { PageLayout } from "../../../shared/ui";
import { ScheduleTable } from "../../../features/schedule-table/ScheduleTable";
import { PageHeader } from "../../../shared/ui/PageHeader/PageHeader";
import { AddScheduleForm } from "../../../features/add-schedule-form/AddScheduleForm";
import {
  saveDataDiary,
  setEditingDiaryKey,
  $editingDiaryKey,
  $studentDiary,
  $editingKey,
  $schedule,
  addScheduleRow,
  deleteSchedule,
  saveData,
  Schedule,
  setEditingKey,
  StudentDiary,
} from "./model";
import { $tutors } from "../../admin/model";

import styles from "./page.module.css";

const { Content } = Layout;
export const ScheduleCreatePage = () => {
  const [
    saveDataDiaryFn,
    setEditingDiaryKeyFn,
    editingDiaryKey,
    studentDiary,
    addScheduleRowFn,
    deleteScheduleFn,
    schedule,
    tutors,
    saveDataFn,
    editingKey,
    setEditingKeyFn,
  ] = useUnit([
    saveDataDiary,
    setEditingDiaryKey,
    $editingDiaryKey,
    $studentDiary,
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
  const isDiaryEditing = (store: StudentDiary) => store.key === editingDiaryKey;

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

  const editDiary = (store: Partial<StudentDiary> & { key?: string }) => {
    form.setFieldsValue({
      homework1: { homeworkNumber: "", color: "" },
      homework2: { homeworkNumber: "", color: "" },
      homework3: { homeworkNumber: "", color: "" },
      homework4: { homeworkNumber: "", color: "" },
      homework5: { homeworkNumber: "", color: "" },
      ...store,
    });
    setEditingDiaryKeyFn(typeof store.key === "string" ? store.key : "");
  };

  const cancel = () => {
    setEditingKeyFn("");
  };
  const cancelDiaryEdit = () => {
    setEditingDiaryKeyFn("");
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

  const saveDiary = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as StudentDiary;

      const newData = [...studentDiary];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        saveDataDiaryFn(newData);
        setEditingDiaryKeyFn("");
      } else {
        newData.push(row);
        saveDataDiaryFn(newData);
        setEditingDiaryKeyFn("");
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

  const columnsStudent = [
    {
      title: "Студент",
      dataIndex: "student",
      key: "student",
      editable: false,
      width: "15%",
    },
    {
      title: "ДЗ 1",
      dataIndex: "homework1",
      key: "homework1",
      editable: true,
      render: (homework1: {
        homeworkNumber: string;
        color: string;
        repository: string;
      }) => (
        <Space direction="vertical">
          <Form.Item name="homework1">
            <Tag color={homework1.color}>{homework1.homeworkNumber}</Tag>
          </Form.Item>
          <a href={homework1.repository} target="_blank" rel="noreferrer">
            Репозиторий
          </a>
        </Space>
      ),
    },
    {
      title: "ДЗ 2",
      dataIndex: "homework2",
      key: "homework2",
      editable: true,
      render: (homework2: {
        homeworkNumber: string;
        color: string;
        repository: string;
      }) => (
        <Space direction="vertical">
          <Form.Item name="homework2">
            <Tag color={homework2.color}>{homework2.homeworkNumber}</Tag>
          </Form.Item>
          <a href={homework2.repository} target="_blank" rel="noreferrer">
            Репозиторий
          </a>
        </Space>
      ),
    },
    {
      title: "ДЗ 3",
      dataIndex: "homework3",
      key: "homework3",
      editable: true,
      render: (homework3: {
        homeworkNumber: string;
        color: string;
        repository: string;
      }) => (
        <Space direction="vertical">
          <Form.Item name="homework3">
            <Tag color={homework3.color}>{homework3.homeworkNumber}</Tag>
          </Form.Item>
          <a href={homework3.repository} target="_blank" rel="noreferrer">
            Репозиторий
          </a>
        </Space>
      ),
    },
    {
      title: "ДЗ 4",
      dataIndex: "homework4",
      key: "homework4",
      editable: true,
      render: (homework4: {
        homeworkNumber: string;
        color: string;
        repository: string;
      }) => (
        <Space direction="vertical">
          <Form.Item name="homework4">
            <Tag color={homework4.color}>{homework4.homeworkNumber}</Tag>
          </Form.Item>
          <a href={homework4.repository} target="_blank" rel="noreferrer">
            Репозиторий
          </a>
        </Space>
      ),
    },
    {
      title: "ДЗ 5",
      dataIndex: "homework5",
      key: "homework5",
      editable: true,
      render: (homework5: {
        homeworkNumber: string;
        color: string;
        repository: string;
      }) => (
        <Space direction="vertical">
          <Form.Item name="homework5">
            <Tag color={homework5.color}>{homework5.homeworkNumber}</Tag>
          </Form.Item>
          <a href={homework5.repository} target="_blank" rel="noreferrer">
            Репозиторий
          </a>
        </Space>
      ),
    },
    {
      title: "Действия",
      dataIndex: "operation",
      width: "12%",
      render: (_: StudentDiary, store: StudentDiary) => {
        const editable = isDiaryEditing(store);
        return editable ? (
          <Space direction="vertical">
            <Typography.Link onClick={() => saveDiary(store.key)}>
              Сохранить
            </Typography.Link>
            <Typography.Link onClick={() => cancelDiaryEdit()}>
              Отмена
            </Typography.Link>
          </Space>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => editDiary(store)}
          >
            Редактировать
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumnsDiary = columnsStudent.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (store: StudentDiary) => ({
        store,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isDiaryEditing(store),
      }),
    };
  });

  const [isScheduleOpen, setIsScheduleOpen] = useState(true);
  
  const nav = ["admin", "schedule", "diary", "contests"];

  return (
    <PageLayout title="Создание расписания" nav={nav} >
      <PageHeader title="Создание расписания" />
      <Content>
        <Space direction="vertical" className={styles._} size="large">
          <ScheduleTable
            isSchedule={isScheduleOpen}
            initialValues={isScheduleOpen ? undefined : studentDiary}
            scheduleStore={isScheduleOpen ? schedule : studentDiary}
            columns={isScheduleOpen ? mergedColumns : mergedColumnsDiary}
            form={form}
            handleOpenSchedule={() => setIsScheduleOpen(true)}
            handleOpenStudents={() => setIsScheduleOpen(false)}
          />
          {isScheduleOpen ? (
            <AddScheduleForm
              schedule={schedule}
              handleClickAddScheduleRow={(value: Schedule) =>
                addScheduleRowFn(value)
              }
              teacherOptions={TEACHER_MAP}
              blockOptions={BLOCK_MAP}
            />
          ) : null}
        </Space>
      </Content>
    </PageLayout>
  );
};