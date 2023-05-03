import { redirect } from "atomic-router";
import {
  createEffect,
  createEvent,
  createStore,
  sample,
  split,
} from "effector";
import { $adminIds, $users, updateUser } from "../../pages/student/lib/mocks";
import { User, UserSettingsType } from "../../pages/student/lib/types";

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

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}