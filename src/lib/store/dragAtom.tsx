"use client";
import { atom } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}
interface IToDoState {
  [key: string]: IToDo[];
}
export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    // Todos: [],
    // Doing: [],
    // Done: [],
  },
});
