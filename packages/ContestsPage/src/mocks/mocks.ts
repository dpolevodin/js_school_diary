import { createEvent, createStore } from "effector";
import {
  ExtendedScheduleDataType,
  User,
} from "../features/contests-table/lib/types";

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "Сергей",
    surname: "Махнаткин",
  },
]);

export const $schedule = createStore<ExtendedScheduleDataType[]>([]);

export const updateUser = createEvent<User | null>();

$users.on(updateUser, (state, payload) => {
  if (payload) {
    const updatedUsers = state.map((user) =>
      user.id === payload.id ? payload : user
    );
    return updatedUsers;
  }
  return state;
});
