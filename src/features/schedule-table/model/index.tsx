import { Space } from "antd";
import { ColumnsType, ColumnType } from "antd/es/table";
import { createEffect, createEvent, createStore, sample } from "effector";
import uuid from "react-uuid";
import { wait } from "../../../shared/lib/wait";
import { scheduleData as scheduleMock } from "../api/mock";
import { MapData, ExtendedScheduleDataType } from "../api/types";

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
    return (
      new Date(first as string).getTime() - new Date(second as string).getTime()
    );
  }
  if (first && second) {
    return first > second ? 1 : -1;
  }
  return 0;
};

export const $schedule = createStore<ExtendedScheduleDataType[]>([]);

export const editScheduleRow = createEvent<ExtendedScheduleDataType>();
export const deleteScheduleRow = createEvent<string>();
export const addScheduleRow = createEvent<ExtendedScheduleDataType>();

$schedule
  .on(editScheduleRow, (state, payload) =>
    state.map((lesson) => {
      if (lesson.id === payload.id) {
        if (payload.homework) {
          return lesson.homeworkId
            ? { ...payload, homeworkId: lesson.homeworkId }
            : { ...payload, homeworkId: uuid() };
        }
        return payload;
      }
      return lesson;
    })
  )
  .on(deleteScheduleRow, (state, payload) => {
    const filteredState = state.filter((lesson) => lesson.id !== payload);
    return filteredState.map((row, index) => ({ ...row, key: index + 1 }));
  })
  .on(addScheduleRow, (state, payload) => [...state, payload]);

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
    defaultSortOrder: "ascend",
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
  },
  {
    title: "ДЗ дата",
    dataIndex: "homeworkDate",
    onFilter(value, record) {
      return filterColumns(value, record, "homeworkDate");
    },
    sorter: (a, b) => sortColumns(a, b, "homeworkDate"),
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

const getFilters = (schedule: ExtendedScheduleDataType[]) => {
  let filters: MapData<ExtendedScheduleDataType> | undefined;
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
  }
  return filters || null;
};

const updateColumnsByFilters = (
  columns: ColumnsType<ExtendedScheduleDataType>,
  filters: MapData<ExtendedScheduleDataType> | null
) => {
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
};

sample({ clock: getDataEv, target: getDataFx });
sample({
  source: getDataFx.doneData,
  target: $schedule,
});

const $filters = sample({
  source: $schedule,
  fn: (schedule) => getFilters(schedule),
});

sample({
  clock: $filters,
  source: $columns,
  fn: (columns, filters) => updateColumnsByFilters(columns, filters),
  target: $columns,
});
