export interface DataType {
  id: string;
  index: number;
  date: string;
  block: string;
  theme: string;
  theme_slot: string;
  teacher: string;
  homework: string;
  homework_date: string;
}

export interface ValueType {
  text: string;
  value: string;
}

export type MapData<T> = {
  [K in keyof T]: ValueType[];
};
