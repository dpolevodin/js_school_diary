import { Store } from "effector";
import { $users } from "../sign/signUp/model";
import {
  UserHomeworkType,
  UserHomeworksPayloadType,
} from "../sign/signUp/lib/types";

export const $studentDiary: Store<UserHomeworksPayloadType[]> = $users.map(
  (state) =>
    state.map((user) => {
      const userHomeworks = Array.isArray(user.homeworks)
        ? user.homeworks.reduce(
            (accum, item: UserHomeworkType) => ({
              ...accum,
              [item.id as string]: { ...item },
            }),
            {}
          )
        : {};

      return {
        id: user.id,
        fullName: `${user.surname} ${user.name}`,
        ...userHomeworks,
      } as UserHomeworksPayloadType;
    })
);
