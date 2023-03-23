import { createEvent, createStore, sample } from "effector";
import defaults from "lodash.defaults";
import { $schedule } from "../../../features/schedule-list/model";
import { User, AdminIds, HomeworksStatus } from "./lib/types";

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "Сергей",
    surname: "Махнаткин",
    homeworks: {
      key: "homeworks",
      homework1: {
        id: 1,
        title: "ДЗ 1",
        deadline: "01.01.2023",
        status: HomeworksStatus.APPROVED,
      },
      homework2: {
        id: 2,
        title: "ДЗ 2",
        deadline: "02.01.2023",
        status: HomeworksStatus.APPROVED,
      },
      homework3: {
        id: 3,
        title: "ДЗ 3",
        deadline: "01.02.2023",
        status: HomeworksStatus.PENDING,
      },
      homework4: {
        id: 4,
        title: "ДЗ 4",
        deadline: "02.02.2023",
        status: HomeworksStatus.REJECTED,
      },
      homework5: {
        id: 5,
        title: "ДЗ 5",
        deadline: "01.03.2023",
        status: HomeworksStatus.DEFAULT,
      },
    },
  },
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3baa",
    nickName: "admin",
    name: "Сергей",
    surname: "Сергей",
    homeworks: {
      key: "homeworks",
      homework1: {
        id: 1,
        title: "ДЗ 1",
        deadline: "01.01.2023",
        status: HomeworksStatus.APPROVED,
      },
      homework2: {
        id: 2,
        title: "ДЗ 2",
        deadline: "02.01.2023",
        status: HomeworksStatus.APPROVED,
      },
      homework3: {
        id: 3,
        title: "ДЗ 3",
        deadline: "01.02.2023",
        status: HomeworksStatus.PENDING,
      },
      homework4: {
        id: 4,
        title: "ДЗ 4",
        deadline: "02.02.2023",
        status: HomeworksStatus.REJECTED,
      },
      homework5: {
        id: 5,
        title: "ДЗ 5",
        deadline: "01.03.2023",
        status: HomeworksStatus.DEFAULT,
      },
    },
  },
]);

export const $adminIds = createStore<AdminIds>([
  "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
]);

export const addUser = createEvent<User>();
export const updateUser = createEvent<User | null>();
export const updateUsersPoints = createEvent<Pick<User, "points">>();

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
  })
  .on(updateUsersPoints, (state, payload) =>
    state.map((user) => ({
      ...user,
      points: defaults(user.points, payload),
    }))
  );

sample({
  source: $schedule,
  fn: (schedule) =>
    schedule.reduce((points, lesson) => ({ ...points, [lesson.date]: 0 }), {
      total: 0,
    } as Pick<User, "points">),
  target: updateUsersPoints,
});
