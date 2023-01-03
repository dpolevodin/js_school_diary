import { createEffect, sample } from "effector";
import { getSessionFx } from "../../shared/lib/api/session";
import { User } from "../../pages/sign/signUp/model";

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
  target: getSessionFx,
});
