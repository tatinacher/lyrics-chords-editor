import { createEffect, createStore } from "effector";

import { Author, fetchAuthors, changeAuthor } from "../../api/authors";

export const getAuthors = createEffect<void, Author[]>();
export const updateAuthor = createEffect<Author, Author>();

getAuthors.use(fetchAuthors);
updateAuthor.use(changeAuthor);

export const $authors = createStore<Author[]>([]);

$authors.on(getAuthors.done, (_, { result }) => {
  return result;
});

$authors.on(getAuthors.fail, (_, { params, error }) => {
  console.log(params, error);
});

$authors.on(updateAuthor.done, (authors, { params }) => {
  const newAuthors = [...authors];
  const index = [...newAuthors].findIndex(author => author._id == params._id);
  newAuthors[index] = params;
  return newAuthors;
});
