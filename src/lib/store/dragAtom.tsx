"use client";
import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}
export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    Todos: ["a", "b"],
    Doing: ["c", "d", "e"],
    Done: ["f"],
  },
});
