import { Space } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import { createEffect, createEvent, createStore, sample } from "effector";
import uuid from "react-uuid";
import { wait } from "../../../shared/lib/wait";
import { scheduleData as scheduleMock } from "../api/mock";
import { MapData, ExtendedScheduleDataType } from "../api/types";

export const $schedule = createStore<ExtendedScheduleDataType[] | undefined>(
  []
);

export const $columns = createStore<ColumnsType<ExtendedScheduleDataType>>([
  {
    title: "Номер",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Дата",
    dataIndex: "date",
    onFilter: (value, record) => record.date.indexOf(value as string) === 0,
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    defaultSortOrder: "ascend",
  },
  {
    title: "Блок",
    dataIndex: "block",
    onFilter: (value, record) => record.block.indexOf(value as string) === 0,
    sorter: (a, b) => (a.block > b.block ? 1 : -1),
  },
  {
    title: "Тема",
    dataIndex: "theme",
    onFilter: (value, record) => record.theme.indexOf(value as string) === 0,
    sorter: (a, b) => (a.theme > b.theme ? 1 : -1),
  },
  {
    title: "Тема слота",
    dataIndex: "themeSlot",
    render: (_, { themeSlots }) => (
      <Space direction="vertical" size="small">
        {themeSlots.map((slot: string) => (
          <div key={slot}>{slot}</div>
        ))}
      </Space>
    ),
  },
  {
    title: "Преподаватель",
    dataIndex: "teacher",
    onFilter: (value, record) => record.teacher.indexOf(value as string) === 0,
    sorter: (a, b) => (a.teacher > b.teacher ? 1 : -1),
  },
  {
    title: "ДЗ",
    dataIndex: "homework",
    onFilter: (value, record) => record.homework.indexOf(value as string) === 0,
    sorter: (a, b) => (a.homework > b.homework ? 1 : -1),
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "ДЗ дата",
    dataIndex: "homeworkDate",
    onFilter: (value, record) =>
      record.homeworkDate.indexOf(value as string) === 0,
    sorter: (a, b) =>
      new Date(a.homeworkDate).getTime() - new Date(b.homeworkDate).getTime(),
  },
]);

export const getDataEv = createEvent();
export const getDataFx = createEffect(async () => {
  await wait(1000);
  return scheduleMock.map((lesson, index) => ({
    ...lesson,
    id: uuid(),
    key: index + 1,
  }));
});

sample({ clock: getDataEv, target: getDataFx });
sample({
  source: getDataFx.doneData,
  target: $schedule,
});

const $filters = sample({
  source: $schedule,
  fn: (schedule) => {
    let filters: MapData<ExtendedScheduleDataType> | undefined;
    if (schedule?.length) {
      const keys = Object.keys(
        schedule[0]
      ) as (keyof ExtendedScheduleDataType)[];
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
    }
    return filters || null;
  },
});

sample({
  clock: $filters,
  source: $columns,
  fn: (columns, filters) => {
    let columnsWithFilters: ColumnsType<ExtendedScheduleDataType> | undefined;
    if (filters) {
      columnsWithFilters = columns.map(
        (column: ColumnType<ExtendedScheduleDataType>) => {
          if (column.dataIndex) {
            switch (column.dataIndex) {
              case "date":
                return { ...column, filters: filters.date };
              case "block":
                return { ...column, filters: filters.block };
              case "theme":
                return { ...column, filters: filters.theme };
              case "teacher":
                return { ...column, filters: filters.teacher };
              case "homework":
                return { ...column, filters: filters.homework };
              default:
                return column;
            }
          }
          return column;
        }
      );
    }
    return columnsWithFilters || columns;
  },
  target: $columns,
});
