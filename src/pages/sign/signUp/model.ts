import { redirect } from "atomic-router";
import { createEvent, createStore } from "effector";
import { routes } from "../../../shared/lib/atomic-router/route";

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

export const signupFormSubmitted = createEvent();

$users.on(addUser, (state, payload) => [...state, payload]);

redirect({
  clock: signupFormSubmitted,
  route: routes.student,
});
