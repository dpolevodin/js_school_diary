import { redirect } from "atomic-router";
import {
  createEffect,
  createEvent,
  createStore,
  sample,
  split,
} from "effector";
import { routes } from "../../shared/lib/atomic-router/route";
import { wait } from "../../shared/lib/wait";
import { $users, User } from "../../pages/sign/signUp/model";

export const $session = createStore<User | null>(null);

export const createSessionFx = createEffect(async (users: User[]) => {
  await wait(2000);

  const id = localStorage.getItem("authenticatedUser");
  if (id !== "") {
    const user = users.find((userData) => userData.id === id);
    return user;
  }
  return null;
});

export const getSessionFx = createEffect(async (users: User[]) => {
  await wait(2000);

  const id = localStorage.getItem("authenticatedUser");
  if (id !== "") {
    const user = users.find((userData) => userData.id === id);
    return user;
  }
  return null;
});

export const pageMounted = createEvent();

export const signOut = createEvent();

$session
  .on(createSessionFx.doneData, (_, user: User | null | undefined) => user)
  .on(createSessionFx.failData, (session, error) =>
    error.message === "unauthorized" ? null : session
  )
  .on(getSessionFx.doneData, (_, user: User | null | undefined) => user)
  .on(getSessionFx.failData, (session, error) =>
    error.message === "unauthorized" ? null : session
  )
  .on(signOut, () => {
    localStorage.removeItem("authenticatedUser");
    return null;
  });

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
