import { createEvent, createStore } from "effector";
import { redirect } from "atomic-router";
import { routes } from "../../shared/lib/atomic-router/route";

    
export type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  password: string;
};
export type UserSettings = {
  tgNickName: string;
  githubNickName: string;
  htmlRepository?: string;
  reactRepository?: string;
}

export const $user = createStore<User>({
  id: 'f19c5f57-a35b-4b8e-bc28-60b85c821dfd',
  nickName: 'Sukhanov',
  name: 'Павел',
  surname: 'Суханов',
  password: 'Qwerty123',
});


export const $userSettings = createStore<UserSettings>(
  {
  tgNickName: '',
  githubNickName: '',
  htmlRepository: '',
  reactRepository: ''
  }
);

export const setUserSettings = createEvent<UserSettings>();

$userSettings.on(setUserSettings, ( _, payload ) => payload)

export const toStudentPage = createEvent();
redirect({
  clock: toStudentPage,
  route: routes.student,
});