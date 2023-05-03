import { createEffect, sample } from "effector";
import { User } from "./types";

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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

const createSessionFx = createEffect(async (users: User[]) => {
  await wait(2000);

  const id = localStorage.getItem("authenticatedUser");
  if (id !== "") {
    const user = users.find((userData) => userData.id === id);
    return user;
  }
  return null;
});

sample({
  clock: signInFx.doneData,
  target: createSessionFx,
});
