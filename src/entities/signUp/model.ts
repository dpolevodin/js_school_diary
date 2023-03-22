import { createEffect, sample } from "effector";
import { createSessionFx } from "../auth/session";
import { User } from "../../pages/sign/signUp/lib/types";

type SignUpPayload = {
  id: string;
  users: User[];
};

export const signUpFx = createEffect(async (obj: SignUpPayload) => {
  localStorage.setItem("authenticatedUser", obj.id);
  return obj.users;
});

sample({
  clock: signUpFx.doneData,
  target: createSessionFx,
});
