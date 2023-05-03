import { createStore } from "effector";
import { User } from "./types";

export const $users = createStore<User[]>([
  {
    id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
    nickName: "admin",
    name: "Сергей",
    surname: "Махнаткин",
  },
]);
