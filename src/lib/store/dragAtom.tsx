"use client";
import { atom } from "recoil";

interface IToDoState {
  [key: string]: string[];
}
export const toDoState = atom<IToDoState>({
  key: "toDos",
  default: {
    todos: ["a", "b"],
    doing: ["c", "d", "e"],
    done: ["f"],
  },
});
