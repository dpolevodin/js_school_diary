import { createEvent, createStore, sample, Store } from "effector";
import isEqual from "lodash.isequal";
import defaults from "lodash.defaults";
import { $schedule } from "../../../features/schedule-table/model";
import { compareHomeworks } from "./lib/compareHomeworks";
import {
  User,
  HomeworksStatus,
  AdminIdsType,
  UserHomeworksType,
  UserPointsType,
  UserHomeworksPayloadType,
  UserHomeworkType,
} from "./lib/types";

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
export const updateUserHomework = createEvent<UserHomeworksPayloadType>();
export const updateUsersHomeworks = createEvent<
  UserHomeworksType | undefined
>();
export const updateUsersPoints = createEvent<UserPointsType | undefined>();

$users
  .on(addUser, (state, payload) =>
    [...state, payload].sort((a, b) => (a.surname > b.surname ? 1 : -1))
  )
  .on(updateUser, (state, payload) => {
    if (payload) {
      const updatedUsers = state.map((user) =>
        user.id === payload.id ? payload : user
      );
      return updatedUsers;
    }
    return state;
  })
  .on(updateUserHomework, (state, payload) => {
    const updatedUsers = state.map((user) => {
      if (user.id === payload.id) {
        const homeworksIds = Object.keys(payload).filter(
          (key) => !(key === "id" || key === "fullName")
        );
        const homeworks: UserHomeworksType = homeworksIds.map(
          (id) => payload[id] as UserHomeworkType
        );
        return { ...user, homeworks };
      }
      return user;
    });
    return updatedUsers;
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

export const $homeworks: Store<UserHomeworksType | undefined> = $schedule.map(
  (schedule, homeworks) => {
    const newHomeworks = schedule.reduce((acc: UserHomeworksType, lesson) => {
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

export const $points: Store<UserPointsType | undefined> = $schedule.map(
  (schedule, points) => {
    const newPoints = schedule.reduce(
      (pointsAcc, lesson) => ({ ...pointsAcc, [lesson.date as string]: 0 }),
      {
        total: 0,
      } as UserPointsType
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
