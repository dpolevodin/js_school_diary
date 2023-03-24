import { createEvent, createStore } from "effector";
import { $users } from "../sign/signUp/model";

export const $studentDiary = $users.map((state) =>
  state.map((user) => {
    const userHomeworks = Array.isArray(user.homeworks)
      ? user.homeworks.reduce(
          (accum, item: string | { [key: string]: string } | any) => ({
            ...accum,
            key: item.id,
            [item.key]: { item },
          })
        )
      : {};

    return {
      id: user.id,
      fullName: `${user.name} ${user.surname}`,
      ...userHomeworks,
    };
  })
);

export const setEditingDiaryKey = createEvent<string>();
export const $editingDiaryKey = createStore<string>("").on(
  setEditingDiaryKey,
  (_, payload) => payload
);
