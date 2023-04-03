import { $users } from "../sign/signUp/model";
import { UserHomeworkType } from "../sign/signUp/lib/types";

export const $studentDiary = $users.map((state) =>
  state.map((user) => {
    const userHomeworks = Array.isArray(user.homeworks)
      ? user.homeworks.reduce(
          (accum, item: UserHomeworkType) => ({
            ...accum,
            [item.id]: { ...item },
          }),
          {}
        )
      : {};

    return {
      id: user.id,
      fullName: `${user.name} ${user.surname}`,
      ...userHomeworks,
    };
  })
);
