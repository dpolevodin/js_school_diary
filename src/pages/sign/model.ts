import { createEffect, createStore } from "effector";

type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  password: string;
};

export const $session = createStore(null);

export const sessionLoadFx = createEffect<void, string | null>(async () => {
  const source = localStorage.getItem("authorized");
  if (!source) {
    return null;
  }
  return localStorage.getItem("id");
});

export const getSessionFx = createEffect(async ({ id }: User) => {
  await new Promise((resolve, reject) => {
    setTimeout(
      () => (sessionLoadFx() ? resolve(id) : reject(new Error("unauthorized"))),
      2000
    );
  });
});

$session
  .on(getSessionFx.doneData, (_, id: string) => id)
  .on(getSessionFx.failData, (session, error) =>
    error.message === "unauthorized" ? null : session
  );
