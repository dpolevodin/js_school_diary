import { createEffect, sample } from "effector";
import { User } from "../../pages/sign/signUp/lib/types";
import { createSessionFx } from "../auth/session";

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
