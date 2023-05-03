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
import { User, UserSettingsType } from "./lib/types";
import { $adminIds, $users, updateUser } from "./lib/mocks";

export const $session = createStore<User | null>({
  id: "f115a395-19b4-0b15-f474-33dbf9bd9e3b",
  nickName: "admin",
  name: "Сергей",
  surname: "Махнаткин",
});

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
  const id = localStorage.getItem("authenticatedUser");
  if (id !== "" && id) {
    const user = users.find((userData) => userData.id === id);
    await wait(2000);
    return user;
  }
  return null;
});

export const pageMounted = createEvent();

export const signOut = createEvent();

export const setUserSettings = createEvent<UserSettingsType>();

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
  })
  .on(setUserSettings, (state, payload) =>
    state ? { ...state, settings: payload } : null
  );

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

export const $isAdmin = sample({
  clock: $session,
  source: $adminIds,
  fn: (adminIds, user) => (user ? adminIds.includes(user.id) : false),
});

sample({
  clock: pageMounted,
  source: $users,
  target: getSessionFx,
});

sample({
  clock: setUserSettings,
  source: $session,
  target: updateUser,
});

redirect({
  clock: setUserSettings,
  route: routes.student,
});

redirect({
  clock: signOut,
  route: routes.home,
});
