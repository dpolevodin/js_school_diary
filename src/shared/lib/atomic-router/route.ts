import { createRoute } from "atomic-router";

export const routes = {
  admin: createRoute(),
  contests: createRoute(),
  diary: createRoute(),
  home: createRoute(),
  schedule: createRoute(),
  scheduleCreate: createRoute(),
  scheduleEdit: createRoute(),
  signIn: createRoute(),
  signUp: createRoute(),
  student: createRoute(),
  studentSettings: createRoute(),
};
