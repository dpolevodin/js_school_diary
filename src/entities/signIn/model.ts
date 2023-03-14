import { createEffect, sample } from "effector";
import { createSessionFx } from "../auth/session";
import { User } from "../../pages/sign/signUp/model";

type SignInPayload = {
  id: string | undefined;
  password: string;
  users: User[];
};

export const signInFx = createEffect(async (obj: SignInPayload) => {
  if (obj.id === undefined) {
    localStorage.setItem("authenticatedUser", "");
  } else {
    const auth: string = obj.password === "123" ? obj.id : "";
    localStorage.setItem("authenticatedUser", auth);
  }

  return obj.users;
});

sample({
  clock: signInFx.doneData,
  target: createSessionFx,
});
