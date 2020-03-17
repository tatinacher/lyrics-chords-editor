import { createStore, createEvent } from "effector";
import { ChordType } from "../../constants/types";

export const updateSong = createEvent<Array<string | ChordType[]>>();
export const $song = createStore<Array<string | ChordType[]>>([]).on(
  updateSong,
  (_, song) => song
);
