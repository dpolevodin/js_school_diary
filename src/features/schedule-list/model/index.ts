import { ColumnsType } from "antd/es/table";
import { createEffect, createEvent, createStore, sample } from "effector";
import uuid from "react-uuid";
import { wait } from "../../../shared/lib/wait";
import { scheduleData as scheduleMock } from "../api/mock";
import { MapData, ExtendedScheduleDataType } from "../api/types";

export const $schedule = createStore<ExtendedScheduleDataType[] | undefined>(
  []
);
export const $filters = createStore<MapData<ExtendedScheduleDataType> | null>(
  null
);
export const $columns = createStore<ColumnsType<ExtendedScheduleDataType>>([]);

export const getDataEv = createEvent();
export const getDataFx = createEffect(async () => {
  await wait(2000);
  return scheduleMock.map((lesson, index) => ({
    ...lesson,
    id: uuid(),
    key: index + 1,
  }));
});

sample({ clock: getDataEv, target: getDataFx });
sample({
  source: getDataFx.doneData,
  target: $schedule,
});
