import { request } from "../../lib/request";

export type Author = {
  author: string;
  description: string;
  _id: string;
};

export const fetchAuthors = (): Promise<Author[]> =>
  request({
    url: "/getData"
  });

export const changeAuthor = ({
  _id,
  description,
  author
}: Author): Promise<Author> =>
  request({
    url: "/updateData/",
    params: { id: _id, update: { author: author, description: description } },
    method: "post"
  });

export const addAuthor = ({ author, description }: Author): Promise<Author> =>
  request({
    url: "/putData",
    params: { author: author, description: description },
    method: "post"
  });
