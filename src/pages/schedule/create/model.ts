import { createEvent, createStore } from "effector";
import dayjs, { Dayjs } from "dayjs";

export type Schedule = {
  key?: string;
  number?: string;
  date: Dayjs;
  block: string;
  theme: string;
  slotThemes: {
    theme1: string;
    theme2: string;
    theme3: string;
  };
  teacher: string;
  homework: {
    homeworkNumber: string;
    deadline: string;
  };
};
export const addScheduleRow = createEvent<Schedule>();
export const saveData = createEvent<Schedule[]>();
export const editSchedule = createEvent<string>();
export const deleteSchedule = createEvent<string>();

export const $schedule = createStore<Schedule[]>([
  {
    key: "1",
    number: "1",
    date: dayjs(),
    block: "HTML-CSS",
    theme: "the basics",
    slotThemes: {
      theme1: "Селекторы",
      theme2: "Классы",
      theme3: "Стили",
    },
    teacher: "Сергей Махнаткин",
    homework: {
      homeworkNumber: "ДЗ 1",
      deadline: "10.01.2023",
    },
  },
]);
$schedule
  .on(addScheduleRow, (state, next) => [
    ...state,
    {
      key: (state.length + 1).toString(),
      number: (state.length + 1).toString(),
      ...next,
    },
  ])
  .on(saveData, (_, payload) => payload)
  .on(editSchedule, (state, payload) =>
    state.filter((schedule) => schedule.key === payload)
  )
  .on(deleteSchedule, (state, payload) =>
    state.filter((schedule) => schedule.key !== payload)
  );

export const $editingKey = createStore<string>("");
export const setEditingKey = createEvent<string>();
$editingKey.on(setEditingKey, (_, payload) => payload);
