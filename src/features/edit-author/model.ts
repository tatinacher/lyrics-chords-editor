import { createEvent, createEffect, createStore, sample } from "effector";
import { changeAuthor, Author, addAuthor } from "../../api/authors";
import { ChangeEvent } from "react";

export type EmptyAuthor = { _id: string; author: string; description: string };
const EmptyAuthor = { _id: "", author: "", description: "" };

export const sendFormFx = createEffect<Author, Author>();
export const sendFormAdd = createEffect<Author, Author>();
export const changed = createEvent<ChangeEvent<HTMLInputElement>>();
export const setForm = createEvent<Author>();
export const onSubmit = createEvent();
export const onSubmitAdd = createEvent();
export const $form = createStore<Author | EmptyAuthor>(EmptyAuthor)
  .on(changed, (s, e: any) => {
    return {
      ...s,
      [e.target.name]: e.target.value
    };
  })
  .on(setForm, (_, author) => author);
sendFormFx.use(changeAuthor);
sample($form, onSubmit, sendFormFx);

export const $author = createStore<Author | EmptyAuthor>(EmptyAuthor)
  .on(changed, (s, e: any) => {
    return {
      ...s,
      [e.target.name]: e.target.value
    };
  })
  .on(setForm, (_, author) => author);
sendFormAdd.use(addAuthor);
sample($form, onSubmitAdd, sendFormAdd);
