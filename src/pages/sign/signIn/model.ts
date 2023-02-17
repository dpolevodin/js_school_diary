import { redirect } from "atomic-router";
import { createEvent } from "effector";
import { routes } from "../../../shared/lib/atomic-router/route";

export const signInAdmin = createEvent();
export const signInUser = createEvent();

redirect({
  clock: signInAdmin,
  route: routes.admin,
});

redirect({
  clock: signInUser,
  route: routes.student,
});
