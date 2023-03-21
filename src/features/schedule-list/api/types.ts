export type ScheduleDataType = {
  date: string;
  block: string;
  theme: string;
  themeSlots: string[];
  teacher: string;
  homework: string;
  homeworkDate: string;
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
