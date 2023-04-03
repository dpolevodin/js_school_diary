import { createEvent, createStore } from "effector";
import { User, AdminIds, HomeworksStatus } from "./lib/types";

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "Сергей",
    surname: "Махнаткин",
    homeworks: [
      {
        id: "homework1",
        title: "ДЗ 1",
        deadline: "01.01.2023",
        status: HomeworksStatus.APPROVED,
      },
      {
        id: "homework2",
        title: "ДЗ 2",
        deadline: "02.01.2023",
        status: HomeworksStatus.APPROVED,
      },
      {
        id: "homework3",
        title: "ДЗ 3",
        deadline: "01.02.2023",
        status: HomeworksStatus.PENDING,
      },
      {
        id: "homework4",
        title: "ДЗ 4",
        deadline: "02.02.2023",
        status: HomeworksStatus.REJECTED,
      },
      {
        id: "homework5",
        title: "ДЗ 5",
        deadline: "01.03.2023",
        status: HomeworksStatus.DEFAULT,
      },
    ],
  },
]);

export const $adminIds = createStore<AdminIds>([
  "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
]);

export const addUser = createEvent<User>();
export const updateUser = createEvent<User | null>();


$users
  .on(addUser, (state, payload) => [...state, payload])
  .on(updateUser, (state, payload) => {
    if (payload) {
      const updatedUsers = state.map((user) =>
        user.id === payload.id ? payload : user
      );
      return updatedUsers;
    }
    return state;
  });
