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

export type ScheduleDataType = {
    date: string | Dayjs;
    block: string;
    theme: string;
    themeSlots: string[] | string;
    teacher: string;
    homework?: string;
    homeworkId?: string;
    homeworkDate?: string | Dayjs;
    homeworkDescription?: string;
  };
  
  export type ExtendedScheduleDataType = ScheduleDataType & {
    id: string;
    key: number;
  };

  export type UserHomeworksPayloadType = {
    id: string;
    fullName: string;
    [key: string]: UserHomeworkType | string;
  };

  export type RenderArgs = {
    deadline: string;
    status: HomeworksStatus;
  };