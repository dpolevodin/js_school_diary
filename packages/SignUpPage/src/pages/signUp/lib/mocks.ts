import { Dayjs } from "dayjs";
import { createEffect, createStore } from "effector";
import { User } from "./types";

export function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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

export const $schedule = createStore<ExtendedScheduleDataType[]>([]);

export const createSessionFx = createEffect(async (users: User[]) => {
  await wait(2000);

  const id = localStorage.getItem("authenticatedUser");
  if (id !== "") {
    const user = users.find((userData) => userData.id === id);
    return user;
  }
  return null;
});