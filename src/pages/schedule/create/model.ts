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
    state
      .filter((schedule) => schedule.key !== payload)
      .map((item, index) => ({
        ...item,
        key: (index + 1).toString(),
        number: (index + 1).toString(),
      }))
  );

export const $editingKey = createStore<string>("");
export const setEditingKey = createEvent<string>();
$editingKey.on(setEditingKey, (_, payload) => payload);

export type StudentDiary = {
  key: string;
  student: string;
  homework1: {
    homeworkNumber: string;
    color: string;
    repository: string;
  };
  homework2: {
    homeworkNumber: string;
    color: string;
    repository: string;
  };
  homework3: {
    homeworkNumber: string;
    color: string;
    repository: string;
  };
  homework4: {
    homeworkNumber: string;
    color: string;
    repository: string;
  };
  homework5: {
    homeworkNumber: string;
    color: string;
    repository: string;
  };
};

// export const editColorDiary = createEvent<{[key: string]: {homeworkNumber: string; color: string;}}>();
export const setEditingDiary = createEvent<StudentDiary>();
export const setEditingDiaryKey = createEvent<string>();
export const saveDataDiary = createEvent<StudentDiary[]>();
export const $studentDiary = createStore<StudentDiary[]>([
  {
    key: "1",
    student: "Иван Иванов",
    homework1: {
      homeworkNumber: "ДЗ 1",
      color: "",
      repository: "https://github.com",
    },
    homework2: {
      homeworkNumber: "ДЗ 2",
      color: "",
      repository: "https://github.com",
    },
    homework3: {
      homeworkNumber: "ДЗ 3",
      color: "",
      repository: "https://github.com",
    },
    homework4: {
      homeworkNumber: "ДЗ 4",
      color: "",
      repository: "https://github.com",
    },
    homework5: {
      homeworkNumber: "ДЗ 5",
      color: "",
      repository: "https://github.com",
    },
  },
  {
    key: "2",
    student: "Петр Петров",
    homework1: {
      homeworkNumber: "ДЗ 1",
      color: "",
      repository: "https://github.com",
    },
    homework2: {
      homeworkNumber: "ДЗ 2",
      color: "",
      repository: "https://github.com",
    },
    homework3: {
      homeworkNumber: "ДЗ 3",
      color: "",
      repository: "https://github.com",
    },
    homework4: {
      homeworkNumber: "ДЗ 4",
      color: "",
      repository: "https://github.com",
    },
    homework5: {
      homeworkNumber: "ДЗ 5",
      color: "",
      repository: "https://github.com",
    },
  },
]).on(saveDataDiary, (_, payload) => payload);

export const $editingDiaryKey = createStore<string>("").on(
  setEditingDiaryKey,
  (_, payload) => payload
);
