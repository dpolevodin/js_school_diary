import { redirect } from "atomic-router";
import { createEffect, createStore, split } from "effector";
import { routes } from "../atomic-router/route";
import { wait } from "../wait";
import { User } from "../../../pages/sign/signUp/model";

export const $session = createStore<User | null>(null);

export const $loading = createStore(false);

export const getSessionFx = createEffect(async (users: User[]) => {
  await wait();

  const id = localStorage.getItem("authenticatedUser");
  if (id !== "") {
    const userIndex = users.findIndex((userData) => userData.id === id);
    return users[userIndex];
  }
  return null;
});

$session
  .on(getSessionFx.doneData, (_, user: User | null) => user)
  .on(getSessionFx.failData, (session, error) =>
    error.message === "unauthorized" ? null : session
  );

$loading.on(getSessionFx, () => true).on(getSessionFx.doneData, () => false);

split({
  source: getSessionFx.doneData,
  match: {
    admin: (user) => user?.nickName === "admin",
    user: (user) => user?.nickName !== "admin",
  },
  cases: {
    admin: redirect({ route: routes.admin }),
    user: redirect({ route: routes.student }),
  } as const,
});
