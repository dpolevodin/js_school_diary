import { Dayjs } from "dayjs";

export type ScheduleDataType = {
  date: string | Dayjs;
  block: string;
  theme: string;
  themeSlots: string[] | string;
  teacher: string;
  homework?: string;
  homeworkId?: string;
  homeworkDate?: string | Dayjs;
  homeworkDescription?: string;
};

export type ExtendedScheduleDataType = ScheduleDataType & {
  id: string;
  key: number;
};