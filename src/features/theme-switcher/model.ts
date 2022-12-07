import { createEvent, createStore } from "effector";

const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
export const $theme = createStore(defaultDark? "dark" : "light");

export const themeChanged = createEvent<string>();

$theme.on(themeChanged, (_, theme) => theme);
