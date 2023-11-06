"use client";
import { atom, selector } from "recoil";

export const minuteState = atom({
  key: "minute",
  default: 0,
});

export const hourSelector = selector({
  key: "hour",
  get: ({ get }) => {
    const minute = get(minuteState);

    return minute / 60;
  },
  set: ({ set }, newValue) => {
    const newMinute = Number(newValue) * 60;
    set(minuteState, newMinute);
  },
});

export const secondSelector = selector({
  key: "second",
  get: ({ get }) => {
    const minute = get(minuteState);
   
    return minute * 60;
  },
  set: ({ set }, newValue) => {
    const newMinute = Number(newValue) / 60;
    set(minuteState, newMinute);
  },
});
