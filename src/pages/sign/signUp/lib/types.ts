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

export type Homeworks = {
  [key: string]:
    | {
        id?: number;
        title: string;
        deadline?: string;
        status?: HomeworksStatus;
      }
    | string;
};

export type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  points?: {
    [key: string]: number;
  };
  settings?: Settings;
  homeworks?: Homeworks;
};

export type AdminIds = string[];
