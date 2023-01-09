import { FC, useEffect } from "react";
import { useUnit } from "effector-react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { $schedule, getDataEv } from "../model";
import { DataType, MapData } from "../api/types";

import styles from "./scheduleList.module.css";

export const ScheduleList: FC = () => {
  const getData = useUnit(getDataEv);
  useEffect(() => getData());

  const schedule = useUnit($schedule);

  let filters: MapData<DataType> | undefined;
  let columns: ColumnsType<DataType> = [];

  if (schedule?.length) {
    const keys = Object.keys(schedule[0]) as (keyof DataType)[];
    keys.forEach((key) => {
      const curKey = schedule?.reduce((acc, obj) => {
        const curGroup = acc[key] ?? [];
        const objValue = obj[key];
        return {
          ...acc,
          [key]: [...curGroup, { text: objValue, value: objValue }],
        };
      }, {} as MapData<DataType>);
      filters = { ...filters, ...curKey };
    });

    if (filters) {
      columns = [
        {
          title: "Номер",
          dataIndex: "index",
          sorter: (a, b) => a.index - b.index,
          sortDirections: ["descend"],
        },
        {
          title: "Дата",
          dataIndex: "date",
          filters: filters.date,
          onFilter: (value, record) =>
            record.date.indexOf(value as string) === 0,
          sorter: (a, b) =>
            new Date(a.date).getTime() - new Date(b.date).getTime(),
          defaultSortOrder: "descend",
        },
        {
          title: "Блок",
          dataIndex: "block",
          filters: filters.block,
          onFilter: (value, record) =>
            record.block.indexOf(value as string) === 0,
          sorter: (a, b) => a.block.length - b.block.length,
        },
        {
          title: "Тема",
          dataIndex: "theme",
          filters: filters.theme,
          onFilter: (value, record) =>
            record.theme.indexOf(value as string) === 0,
          sorter: (a, b) => a.theme.length - b.theme.length,
        },
        {
          title: "Тема слота",
          dataIndex: "theme_slot",
          filters: filters.theme_slot,
          onFilter: (value, record) =>
            record.theme_slot.indexOf(value as string) === 0,
          sorter: (a, b) => a.theme_slot.length - b.theme_slot.length,
        },
        {
          title: "Преподаватель",
          dataIndex: "teacher",
          filters: filters.teacher,
          onFilter: (value, record) =>
            record.teacher.indexOf(value as string) === 0,
          sorter: (a, b) => a.teacher.length - b.teacher.length,
        },
        {
          title: "ДЗ",
          dataIndex: "homework",
          filters: filters.homework,
          onFilter: (value, record) =>
            record.homework.indexOf(value as string) === 0,
          sorter: (a, b) => a.homework.length - b.homework.length,
        },
        {
          title: "ДЗ дата",
          dataIndex: "homework_date",
          filters: filters.homework_date,
          onFilter: (value, record) =>
            record.homework_date.indexOf(value as string) === 0,
          sorter: (a, b) =>
            new Date(a.homework_date).getTime() -
            new Date(b.homework_date).getTime(),
        },
      ];
    }
  }

  return (
    <div className={styles.Wrapper}>
      <Table columns={columns} dataSource={schedule} onChange={() => null} />
    </div>
  );
};
