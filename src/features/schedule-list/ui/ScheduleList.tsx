import { useEffect } from "react";
import { useUnit } from "effector-react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import { $schedule, getDataEv } from "../model";
import { ExtendedScheduleDataType, MapData } from "../api/types";

import styles from "./ScheduleList.module.css";

export const ScheduleList = () => {
  const getData = useUnit(getDataEv);
  useEffect(() => getData(), []);

  const schedule = useUnit($schedule);

  let filters: MapData<ExtendedScheduleDataType> | undefined;
  let columns: ColumnsType<ExtendedScheduleDataType> = [];

  if (schedule?.length) {
    const keys = Object.keys(schedule[0]) as (keyof ExtendedScheduleDataType)[];
    keys.forEach((key) => {
      const curKey = schedule?.reduce((acc, obj) => {
        const curGroup = acc[key] ?? [];
        const objValue = obj[key];
        return {
          ...acc,
          [key]: [...curGroup, { text: objValue, value: objValue }],
        };
      }, {} as MapData<ExtendedScheduleDataType>);
      filters = { ...filters, ...curKey };
    });

    if (filters) {
      columns = [
        {
          title: "Номер",
          dataIndex: "key",
          sorter: (a, b) => a.key - b.key,
          sortDirections: ["descend", "ascend"],
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
          sorter: (a, b) => (a.block > b.block ? 1 : -1),
        },
        {
          title: "Тема",
          dataIndex: "theme",
          filters: filters.theme,
          onFilter: (value, record) =>
            record.theme.indexOf(value as string) === 0,
          sorter: (a, b) => (a.theme > b.theme ? 1 : -1),
        },
        {
          title: "Тема слота",
          dataIndex: "themeSlot",
          filters: filters.themeSlots,
          render: (_, { themeSlots }) => (
            <>
              {themeSlots.map((slot: string) => (
                <div className={styles.slot} key={slot}>
                  {slot}
                </div>
              ))}
            </>
          ),
        },
        {
          title: "Преподаватель",
          dataIndex: "teacher",
          filters: filters.teacher,
          onFilter: (value, record) =>
            record.teacher.indexOf(value as string) === 0,
          sorter: (a, b) => (a.teacher > b.teacher ? 1 : -1),
        },
        {
          title: "ДЗ",
          dataIndex: "homework",
          filters: filters.homework,
          onFilter: (value, record) =>
            record.homework.indexOf(value as string) === 0,
          sorter: (a, b) => (a.homework > b.homework ? 1 : -1),
          sortDirections: ["descend", "ascend"],
        },
        {
          title: "ДЗ дата",
          dataIndex: "homeworkDate",
          filters: filters.homeworkDate,
          onFilter: (value, record) =>
            record.homeworkDate.indexOf(value as string) === 0,
          sorter: (a, b) =>
            new Date(a.homeworkDate).getTime() -
            new Date(b.homeworkDate).getTime(),
        },
      ];
    }
  }

  return (
    <Table columns={columns} dataSource={schedule} onChange={() => null} />
  );
};
