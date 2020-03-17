import { createEffect, createStore } from "effector";

import { Author, fetchAuthors } from "../../api/authors";

export const getAuthors = createEffect<void, Author[]>();

getAuthors.use(fetchAuthors);

export const $authors = createStore<Author[] | null>(null);

$authors.on(getAuthors.done, (_, { result }) => {
  return result;
});
