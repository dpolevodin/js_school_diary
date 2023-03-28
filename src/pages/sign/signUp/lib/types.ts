import { Dayjs } from "dayjs";

export type Settings = {
  tgNickName?: string;
  githubNickName?: string;
  [key: string]: string | undefined;
};

export enum HomeworksStatus {
  DEFAULT = "default",
  APPROVED = "approved",
  PENDING = "pending",
  REJECTED = "rejected",
}
export type Homework = {
  id?: string;
  title: string;
  deadline?: string | Dayjs;
  status?: HomeworksStatus;
};

export type Homeworks = Homework[];
export type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  settings?: Settings;
  homeworks?: Homeworks;
};

export type AdminIds = string[];
