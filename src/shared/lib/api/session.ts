import { redirect } from "atomic-router";
import {
  createEffect,
  createEvent,
  createStore,
  sample,
  split,
} from "effector";
import { routes } from "../atomic-router/route";
import { wait } from "../wait";
import { $users, User } from "../../../pages/sign/signUp/model";

export const $session = createStore<User | null>(null);

export const $loading = createStore(false);

export const createSessionFx = createEffect(async (users: User[]) => {
  await wait();

  const id = localStorage.getItem("authenticatedUser");
  if (id !== "") {
    const userIndex = users.findIndex((userData) => userData.id === id);
    return users[userIndex];
  }
  return null;
});

export const getSessionFx = createEffect(async (users: User[]) => {
  const id = localStorage.getItem("authenticatedUser");
  if (id !== "") {
    const userIndex = users.findIndex((userData) => userData.id === id);
    return users[userIndex];
  }
  return null;
});

export const pageMounted = createEvent();

$session
  .on(createSessionFx.doneData, (_, user: User | null) => user)
  .on(createSessionFx.failData, (session, error) =>
    error.message === "unauthorized" ? null : session
  )
  .on(getSessionFx.doneData, (_, user: User | null) => user)
  .on(getSessionFx.failData, (session, error) =>
    error.message === "unauthorized" ? null : session
  );

$loading.on(createSessionFx, () => true).on(getSessionFx.doneData, () => false);

split({
  source: createSessionFx.doneData,
  match: {
    admin: (user) => user?.nickName === "admin",
    user: (user) => user?.nickName !== "admin",
  },
  cases: {
    admin: redirect({ route: routes.admin }),
    user: redirect({ route: routes.student }),
  } as const,
});

sample({
  source: $users,
  clock: pageMounted,
  target: getSessionFx,
});
