import { CheckboxValueType } from "antd/es/checkbox/Group";
import { createEvent, createStore } from "effector";

export type Tutor = {
  fullName: string;
  telegramNickName: string;
  githubNickName: string;
};

export type Repository = {
  name: string;
  description: string;
};

export type Block = {
  name: string;
  description: string;
};

export const $tutors = createStore([
  {
    fullName: "Махнаткин Сергей",
    telegramNickName: "@makhnatkin",
    githubNickName: "makhnatkin",
  },
]);

export const addTutor = createEvent<Tutor>();

export const deleteTutor = createEvent<string>();

$tutors
.on(addTutor, (state, payload) => [...state, payload])
.on(deleteTutor, (state, payload) =>
state.filter((tutor) => tutor.telegramNickName !== payload)
);

export const $repositories = createStore<Repository[]>([]);

export const addRepository = createEvent<Repository>();

export const deleteRepository = createEvent<string>();

$repositories
.on(addRepository, (state, payload) => [...state, payload])
.on(deleteRepository, (state, payload) =>
state.filter((repository: Repository) => repository.name !== payload)
);

export const $availableDays = createStore<CheckboxValueType[]>([2, 5]);

export const setAvailableDays = createEvent<CheckboxValueType[]>();

$availableDays.on(setAvailableDays, (_, availableDays) => availableDays);

export const $forbiddenDates = createStore<string[]>([]);

export const setForbiddenDates = createEvent<string>();

export const deleteForbiddenDate = createEvent<string>();

$forbiddenDates
.on(setForbiddenDates, (state, payload: string) => [...state, payload])
.on(deleteForbiddenDate, (state, payload: string) =>
state.filter((date) => date !== payload)
);

export const $additionalDates = createStore<Array<string>>([]);

export const setAdditionalDates = createEvent<string>();

export const deleteAdditionalDate = createEvent<string>();

$additionalDates
.on(setAdditionalDates, (state, payload) => [...state, payload])
.on(deleteAdditionalDate, (state, payload) =>
state.filter((date) => date !== payload)
);

export const $blocks = createStore<Block[]>([]);

export const addBlock = createEvent<Block>();

export const deleteBlock = createEvent<string>();

$blocks
.on(addBlock, (state, payload) => [...state, payload])
.on(deleteBlock, (state, payload) =>
state.filter((block: Block) => block.name !== payload)
);