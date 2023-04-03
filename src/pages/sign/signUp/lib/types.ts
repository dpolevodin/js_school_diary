import { Dayjs } from "dayjs";

export type UserSettingsType = {
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
export type UserHomeworkType = {
  id?: string;
  title: string;
  deadline?: string | Dayjs;
  status?: HomeworksStatus;
};
export type UserPointsType = {
  [key: string]: number;
};

export type UserHomeworksType = UserHomeworkType[];
export type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  points?: UserPointsType;
  settings?: UserSettingsType;
  homeworks?: UserHomeworksType;
};

export type AdminIdsType = string[];
