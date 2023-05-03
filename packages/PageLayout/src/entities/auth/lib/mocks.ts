import { createStore, createEvent } from "effector";
import { AdminIdsType, User } from "./types";

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
  
  export const updateUser = createEvent<User | null>();