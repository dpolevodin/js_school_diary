import { createStore } from "effector";
import dayjs from "dayjs";
import { Badge, Popover, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { ExtendedScheduleDataType } from "../features/schedule-edit-table/lib/types";
import { EyeOutlined } from "@ant-design/icons";
import styles from "../features/schedule-edit-table/ScheduleEditTable.module.css"

const filterColumns = (
    value: string | number | boolean,
    record: ExtendedScheduleDataType,
    key: keyof ExtendedScheduleDataType | undefined
  ) => {
    if (key) {
      const recordValue = record[key];
      if (typeof recordValue === "string") {
        return recordValue.indexOf(value as string) === 0;
      }
      if (typeof recordValue === "number") {
        return recordValue === value;
      }
    }
    return false;
  };

  const sortColumns = (
    a: ExtendedScheduleDataType,
    b: ExtendedScheduleDataType,
    key: keyof ExtendedScheduleDataType
  ) => {
    const first = a[key];
    const second = b[key];
    if (typeof first === "number") {
      return Number(a[key]) - Number(b[key]);
    }
    if (key === "date" || key === "homeworkDate") {
      const dateA = dayjs(first as string, "DD.MM.YYYY");
      const dateB = dayjs(second as string, "DD.MM.YYYY");
      return dateA.diff(dateB);
    }
    if (first && second) {
      return first > second ? 1 : -1;
    }
    return 0;
  };

export const $schedule = createStore<ExtendedScheduleDataType[]>([]);

export const $columns = createStore<ColumnsType<ExtendedScheduleDataType>>([
    {
      title: "Номер",
      dataIndex: "key",
      sorter: (a, b) => sortColumns(a, b, "key"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Дата",
      dataIndex: "date",
      onFilter(value, record) {
        return filterColumns(value, record, "date");
      },
      sorter: (a, b) => sortColumns(a, b, "date"),
    },
    {
      title: "Блок",
      dataIndex: "block",
      onFilter(value, record) {
        return filterColumns(value, record, "block");
      },
      sorter: (a, b) => sortColumns(a, b, "block"),
    },
    {
      title: "Тема",
      dataIndex: "theme",
      onFilter(value, record) {
        return filterColumns(value, record, "theme");
      },
      sorter: (a, b) => sortColumns(a, b, "theme"),
    },
    {
      title: "Тема слота",
      dataIndex: "themeSlots",
      render: (_, { themeSlots }) => (
        <Space direction="vertical" size="small">
          {Array.isArray(themeSlots)
            ? themeSlots.map((slot: string) => <div key={slot}>{slot}</div>)
            : themeSlots}
        </Space>
      ),
    },
    {
      title: "Преподаватель",
      dataIndex: "teacher",
      onFilter(value, record) {
        return filterColumns(value, record, "teacher");
      },
      sorter: (a, b) => sortColumns(a, b, "teacher"),
    },
    {
      title: "ДЗ",
      dataIndex: "homework",
      onFilter(value, record) {
        return filterColumns(value, record, "homework");
      },
      sorter: (a, b) => sortColumns(a, b, "homework"),
      sortDirections: ["descend", "ascend"],
      render: (value, record) =>
        value && record.homeworkDescription ? (
          <Popover
            overlayClassName={styles.popover}
            placement="bottom"
            content={<div>{record.homeworkDescription}</div>}
          >
            <Badge
              count={<EyeOutlined className={styles.badgeIcon} />}
              offset={[5, -5]}
            >
              {value}
            </Badge>
          </Popover>
        ) : (
          <div>{value}</div>
        ),
    },
    {
      title: "ДЗ дедлайн",
      dataIndex: "homeworkDate",
      onFilter(value, record) {
        return filterColumns(value, record, "homeworkDate");
      },
      sorter: (a, b) => sortColumns(a, b, "homeworkDate"),
    },
  ]);

  export type Tutor = {
    fullName: string;
    telegramNickName: string;
    githubNickName: string;
  };
  
  export type Repository = {
    name: string;
    description: string;
  };
  
  export type Block = {
    name: string;
    description: string;
  };
  
  export const $tutors = createStore([
    {
      fullName: "Махнаткин Сергей",
      telegramNickName: "@makhnatkin",
      githubNickName: "makhnatkin",
    },
  ]);
  
  export const $repositories = createStore<Repository[]>([]);
  
  export const $availableDays = createStore<CheckboxValueType[]>([1, 4]);
  
  export const $forbiddenDates = createStore<string[]>([]);
  
  export const $additionalDates = createStore<Array<string>>([]);

  export const $blocks = createStore<Block[]>([]);
  
  