import { createEvent, createStore } from "effector";

type User = {
  nickName: string;
  name: string;
  surname: string;
  patronymic: string;
  password: string;
  isAdmin: boolean;
};
export const $users = createStore<User[]>([
  {
    nickName: "admin",
    password: "123",
    name: "",
    surname: "",
    patronymic: "",
    isAdmin: true,
  },
]);

export const addUser = createEvent<User>();

$users.on(addUser, (state, payload) => [...state, payload]);
