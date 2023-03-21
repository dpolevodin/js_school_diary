import { createRoute } from "atomic-router";

export const routes = {
  admin: createRoute(),
  contests: createRoute(),
  diary: createRoute(),
  home: createRoute(),
  schedule: createRoute(),
  scheduleEdit: createRoute(),
  signIn: createRoute(),
  signUp: createRoute(),
  student: createRoute(),
  studentSettings: createRoute(),
};
