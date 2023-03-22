import { Form, Select, Space, Typography } from "antd";
import { useUnit } from "effector-react";
import { PageLayout } from "../../shared/ui";
import { DataTable } from "../../features/data-table/DataTable";
import { $studentDiary, $editingDiaryKey, setEditingDiaryKey } from "./model";
import { $users, saveHomework } from "../sign/signUp/model";
import { Homeworks, User } from "../sign/signUp/lib/types";

const nav = ["admin", "schedule", "diary", "contests"];

export const DiaryPage = () => {
  const [
    users,
    saveHomeworkFn,
    studentDiary,
    editingDiaryKey,
    setEditingDiaryKeyFn,
  ] = useUnit([
    $users,
    saveHomework,
    $studentDiary,
    $editingDiaryKey,
    setEditingDiaryKey,
  ]);

  const [form] = Form.useForm();
  const isDiaryEditing = (store: User) => store.id === editingDiaryKey;

  const editDiary = (store: Partial<User> & { key?: string }) => {
    form.setFieldsValue({
      homeworks: [
        {
          homework1: { status: "" },
          homework2: { status: "" },
          homework3: { status: "" },
          homework4: { status: "" },
          homework5: { status: "" },
        },
      ],
      ...store,
    });
    setEditingDiaryKeyFn(typeof store.id === "string" ? store.id : "");
  };

  const cancelDiaryEdit = () => {
    setEditingDiaryKeyFn("");
  };

  const saveDiary = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Homeworks;

      const newData = [...users];
      const index = newData.findIndex((item) => key === item.id);
      if (index > -1) {
        const editingUser = newData[index];
        newData.splice(index, 1, {
          ...editingUser,
          homeworks: [row],
        });
        saveHomeworkFn(newData);
        setEditingDiaryKeyFn("");
      } else {
        // newData.push(row);
        saveHomeworkFn(newData);
        setEditingDiaryKeyFn("");
      }
    } catch (errInfo) {
      // console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: "Студент",
      dataIndex: "fullName",
      key: "fullName",
      editable: false,
      width: "15%",
    },
    {
      title: "ДЗ 1",
      dataIndex: ["homework1"],
      key: ["homework1"],
      editable: true,
      width: "15%",
      render: (homework1: Homeworks) => (
        <Select
          disabled
          defaultValue={homework1.status}
          // value={homework1.status}
          style={{ width: 150 }}
          options={[
            { value: "approved", label: "Зачет" },
            { value: "pending", label: "Выполняется" },
            { value: "rejected", label: "Незачет" },
            { value: "default", label: "Не выбрано" },
          ]}
        />
      ),
    },
    {
      title: "ДЗ 2",
      dataIndex: ["homework2"],
      key: ["homework2"],
      editable: true,
      width: "15%",
      render: (homework2: Homeworks) => (
        <Select
          disabled
          defaultValue={homework2.status}
          value={homework2.status}
          style={{ width: 150 }}
          options={[
            { value: "approved", label: "Зачет" },
            { value: "pending", label: "Выполняется" },
            { value: "rejected", label: "Незачет" },
            { value: "default", label: "Не выбрано" },
          ]}
        />
      ),
    },
    {
      title: "ДЗ 3",
      dataIndex: ["homework3"],
      key: ["homework3"],
      editable: true,
      width: "15%",
      render: (homework3: Homeworks) => (
        <Select
          disabled
          defaultValue={homework3.status}
          value={homework3.status}
          style={{ width: 150 }}
          options={[
            { value: "approved", label: "Зачет" },
            { value: "pending", label: "Выполняется" },
            { value: "rejected", label: "Незачет" },
            { value: "default", label: "Не выбрано" },
          ]}
        />
      ),
    },
    {
      title: "ДЗ 4",
      dataIndex: ["homework4"],
      key: ["homework4"],
      editable: true,
      width: "15%",
      render: (homework4: Homeworks) => (
        <Select
          disabled
          defaultValue={homework4.status}
          value={homework4.status}
          style={{ width: 150 }}
          // onChange={handleChange}
          options={[
            { value: "approved", label: "Зачет" },
            { value: "pending", label: "Выполняется" },
            { value: "rejected", label: "Незачет" },
            { value: "default", label: "Не выбрано" },
          ]}
        />
      ),
    },
    {
      title: "ДЗ 5",
      dataIndex: ["homework5"],
      key: ["homework5"],
      editable: true,
      width: "15%",
      render: (homework5: Homeworks) => (
        <Select
          disabled
          defaultValue={homework5.status}
          value={homework5.status}
          style={{ width: 150 }}
          // onChange={handleChange}
          options={[
            { value: "approved", label: "Зачет" },
            { value: "pending", label: "Выполняется" },
            { value: "rejected", label: "Незачет" },
            { value: "default", label: "Не выбрано" },
          ]}
        />
      ),
    },
    {
      title: "Действия",
      dataIndex: "operation",
      width: "12%",
      render: (_: User, store: User) => {
        const editable = isDiaryEditing(store);
        return editable ? (
          <Space direction="vertical">
            <Typography.Link onClick={() => saveDiary(store.id)}>
              Сохранить
            </Typography.Link>
            <Typography.Link onClick={() => cancelDiaryEdit()}>
              Отмена
            </Typography.Link>
          </Space>
        ) : (
          <Space direction="vertical">
            <Typography.Link
              disabled={editingDiaryKey !== ""}
              onClick={() => editDiary(store)}
            >
              Редактировать
            </Typography.Link>
            {/* <Typography.Link */}
            {/*     disabled={editingDiaryKey !== ""} */}
            {/*     onClick={() => */}
            {/*         typeof store.id === "string" */}
            {/*             ? deleteScheduleFn(store.key) */}
            {/*             : null */}
            {/*     } */}
            {/* > */}
            {/*     Удалить */}
            {/* </Typography.Link> */}
          </Space>
        );
      },
    },
  ];

  const mergedColumnsDiary = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (store: User) => ({
        store,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isDiaryEditing(store),
      }),
    };
  });

  return (
    <PageLayout title="Дневник" nav={nav}>
      <DataTable columns={mergedColumnsDiary} form={form} data={studentDiary} />
    </PageLayout>
  );
};
