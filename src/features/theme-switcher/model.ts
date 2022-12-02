import { createEvent, createStore } from "effector";

export const $theme = createStore('');

export const themeChanged = createEvent<string>();

$theme.on(themeChanged, (_, theme) => theme);