import { createEvent, createStore, sample, Store } from "effector";
import isEqual from "lodash.isequal";
import defaults from "lodash.defaults";
import { $schedule } from "../../../features/schedule-table/model";
import { compareHomeworks } from "./lib/compareHomeworks";
import {
  User,
  AdminIds,
  HomeworksStatus,
  Homeworks,
  Points,
} from "./lib/types";

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
export const updateUsersHomeworks = createEvent<Homeworks | undefined>();
export const updateUsersPoints = createEvent<Points | undefined>();

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
  .on(updateUsersHomeworks, (state, payload) =>
    state.map((user) => {
      if (!user.homeworks) return { ...user, homeworks: payload };
      return { ...user, homeworks: compareHomeworks(user.homeworks, payload) };
    })
  )
  .on(updateUsersPoints, (state, payload) =>
    state.map((user) => ({
      ...user,
      points: defaults(user.points, payload),
    }))
  );

export const $homeworks: Store<Homeworks | undefined> = $schedule.map(
  (schedule, homeworks) => {
    const newHomeworks = schedule.reduce((acc: Homeworks, lesson) => {
      const homework = lesson.homework
        ? {
            id: lesson.homeworkId,
            title: lesson.homework,
            deadline: lesson.homeworkDate,
            status: HomeworksStatus.DEFAULT,
          }
        : null;
      return homework ? [...acc, homework] : acc;
    }, []);
    return isEqual(homeworks, newHomeworks) ? homeworks : newHomeworks;
  }
);

export const $points: Store<Points | undefined> = $schedule.map(
  (schedule, points) => {
    const newPoints = schedule.reduce(
      (pointsAcc, lesson) => ({ ...pointsAcc, [lesson.date as string]: 0 }),
      {
        total: 0,
      } as Points
    );
    return isEqual(points, newPoints) ? points : newPoints;
  }
);

sample({
  source: $homeworks,
  target: updateUsersHomeworks,
});

sample({
  source: $points,
  target: updateUsersPoints,
});
