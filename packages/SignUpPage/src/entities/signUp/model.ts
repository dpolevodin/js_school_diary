import { createEffect, sample } from "effector";
import { User } from "../../pages/signUp/lib/types";
import { createSessionFx } from "../../pages/signUp/lib/mocks";


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
