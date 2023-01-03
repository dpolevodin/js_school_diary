import { createEffect, sample } from "effector";
import { getSessionFx } from "../../shared/lib/api/session";
import { User } from "../../pages/sign/signUp/model";
import { wait } from "../../shared/lib/wait";

type SignUpPayload = {
  id: string;
  users: User[];
};

export const signUpFx = createEffect(async (obj: SignUpPayload) => {
  localStorage.setItem("authenticatedUser", obj.id);
  await wait();
  return obj.users;
});

sample({
  clock: signUpFx.doneData,
  target: getSessionFx,
});
