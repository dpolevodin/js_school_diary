import { createEvent, createStore } from "effector";
import { AdminIdsType, ExtendedScheduleDataType, Repository, User, UserSettingsType } from "./types";

export const $repositories = createStore<Repository[]>([]);

export const $schedule = createStore<ExtendedScheduleDataType[]>([]);

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "Сергей",
    surname: "Махнаткин",
  },
]);

export const $adminIds = createStore<AdminIdsType>([
  "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
]);

export const addUser = createEvent<User>();
export const updateUser = createEvent<User | null>();

export const setUserSettings = createEvent<UserSettingsType>();