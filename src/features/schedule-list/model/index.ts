import { createEffect, createEvent, createStore, sample } from "effector";
import { scheduleData as scheduleMock } from "../api/mock";
import { DataType } from "../api/types";

export const $schedule = createStore<DataType[] | undefined>([]);
export const getDataEv = createEvent();
export const getDataFx = createEffect(() => scheduleMock);

sample({ clock: getDataEv, target: getDataFx });
sample({
  source: getDataFx.doneData,
  target: $schedule,
});
