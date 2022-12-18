import { redirect } from "atomic-router";
import { createEvent, createStore } from "effector";
import { routes } from "../../../shared/lib/atomic-router/route";

type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  password: string;
};

type AdminIds = string[];

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    password: "123",
    name: "",
    surname: "",
  },
]);

export const $adminIds = createStore<AdminIds>([
  "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
]);

export const addUser = createEvent<User>();

export const signupFormSubmitted = createEvent();

$users.on(addUser, (state, payload) => [...state, payload]);

redirect({
  clock: signupFormSubmitted,
  route: routes.student,
});
