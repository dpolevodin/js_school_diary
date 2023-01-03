import { createEffect, sample } from "effector";
import { getSessionFx } from "../../shared/lib/api/session";
import { User } from "../../pages/sign/signUp/model";
import { wait } from "../../shared/lib/wait";

type SignInPayload = {
  id: string;
  password: string;
  users: User[];
};

export const signInFx = createEffect(async (obj: SignInPayload) => {
  const auth: string = obj.password === "123" ? obj.id : "";
  await wait();
  localStorage.setItem("authenticatedUser", auth);
  return obj.users;
});

sample({
  clock: signInFx.doneData,
  target: getSessionFx,
});
