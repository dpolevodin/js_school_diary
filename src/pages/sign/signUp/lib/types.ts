export type Settings = {
  tgNickName?: string;
  githubNickName?: string;
  [key: string]: string | undefined;
};

export type Homeworks = {
  [key: string]:
    | {
        id?: number;
        title: string;
        deadline?: string;
        status?: "default" | "approved" | "pending" | "rejected";
      }
    | number;
};

export type User = {
  id: string;
  nickName: string;
  name: string;
  surname: string;
  patronymic?: string;
  settings?: Settings;
  homeworks?: Homeworks[];
};

export type AdminIds = string[];
