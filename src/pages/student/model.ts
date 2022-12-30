import { createEvent, createStore } from "effector";
import { redirect } from "atomic-router";
import { routes } from "../../shared/lib/atomic-router/route";

export type UserFullName = string;
export type Login = string;
export type TelegramNickName = string;
export type GithubNickName = string;
export type RepositoryHtml = string;
export type RepositoryReact = string;
export type Repository = string;

export const setRepository = createEvent<Repository>();
export const setTelegramNickName = createEvent<TelegramNickName>();
export const setGithubNickName = createEvent<GithubNickName>();
export const setRepositoryHtml = createEvent<RepositoryHtml>();
export const setRepositoryReact = createEvent<RepositoryReact>();


export const $repository = createStore<Repository[]>([])
.on(setRepository, () => {})
export const $userFullName = createStore<UserFullName>('Суханов Павел');
export const $login = createStore<Login>('sukhanov');
export const $telegramNickName = createStore<TelegramNickName>('')
.on(setTelegramNickName, ( state, payload) => state = payload);
export const $githubNickName = createStore<GithubNickName>('')
.on(setGithubNickName, (state, payload) => state = payload);
export const $repositoryHtml = createStore<RepositoryHtml>('')
.on(setRepositoryHtml, (state, payload) => state = payload);
export const $repositoryReact = createStore<RepositoryReact>('')
.on(setRepositoryReact, (state, payload) => state = payload);

export const toStudentPage = createEvent();
redirect({
  clock: toStudentPage,
  route: routes.student,
});