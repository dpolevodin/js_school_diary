import { createEvent, createStore, sample, Store } from "effector";
import isEqual from "lodash.isequal";
import { $schedule } from "../../../features/schedule-table/model";
import { compareHomeworks } from "./lib/compareHomeworks";
import { User, AdminIds, HomeworksStatus, Homeworks } from "./lib/types";

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "Сергей",
    surname: "Махнаткин",
  },
]);

export const $adminIds = createStore<AdminIds>([
  "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
]);

export const addUser = createEvent<User>();
export const updateUser = createEvent<User | null>();
export const updateUsersHomeworks = createEvent<Homeworks | undefined>();

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

sample({
  source: $homeworks,
  target: updateUsersHomeworks,
});
