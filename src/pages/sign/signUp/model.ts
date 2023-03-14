import { createEvent, createStore } from "effector";

export type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
};

type AdminIds = string[];

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "",
    surname: "",
  },
]);

export const $adminIds = createStore<AdminIds>([
  "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
]);

export const addUser = createEvent<User>();

$users.on(addUser, (state, payload) => [...state, payload]);
