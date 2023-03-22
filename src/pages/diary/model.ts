import { createEvent, createStore } from "effector";
import { $users } from "../sign/signUp/model";

export const $studentDiary = $users.map((state) =>
  state.map((user) => {
    const userHomeworks = user.homeworks
      ? user.homeworks.reduce(
          (accum, item: string | { [key: string]: string } | any) => ({
            ...accum,
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

// const userHomeworks = user.homeworks?
// user.homeworks.reduce((accum, item, index, array) => (
//     { ...accum, {array[index]}},  ) ) : {};

export const setEditingDiaryKey = createEvent<string>();
export const $editingDiaryKey = createStore<string>("").on(
  setEditingDiaryKey,
  (_, payload) => payload
);
