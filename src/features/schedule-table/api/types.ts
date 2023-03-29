import { Dayjs } from "dayjs";

export type ScheduleDataType = {
  date: string | Dayjs;
  block: string;
  theme: string;
  themeSlots: string[] | string;
  teacher: string;
  homework?: string;
  homeworkDate?: string | Dayjs;
  homeworkDescription?: string;
};

export type ExtendedScheduleDataType = ScheduleDataType & {
  id: string;
  key: number;
};

export type FilterValueType = {
  text: string;
  value: string;
};

export type MapData<T> = {
  [K in keyof T]: FilterValueType[];
};
