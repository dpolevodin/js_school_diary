import { createEvent, createStore } from "effector";
import { redirect } from "atomic-router";
import { routes } from "../../shared/lib/atomic-router/route";

export type UserSettings = {
  tgNickName: string;
  githubNickName: string;
  htmlRepository: string;
  reactRepository: string;
};

export type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  password: string;
  settings?: UserSettings;
};

export const $user = createStore<User>({
  id: "f19c5f57-a35b-4b8e-bc28-60b85c821dfd",
  nickName: "Sukhanov",
  name: "Павел",
  surname: "Суханов",
  password: "Qwerty123",
  settings: {
    tgNickName: "",
    githubNickName: "",
    htmlRepository: "",
    reactRepository: "",
  },
});

export const setUserSettings = createEvent<UserSettings>();

$user.on(setUserSettings, (state, payload) => ({
  ...state,
  settings: payload,
}));

redirect({
  clock: setUserSettings,
  route: routes.student,
});
