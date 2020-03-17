import { request } from "../../lib/request";

export type Author = {
  author: string;
  description: string;
  id: string;
};

export const fetchAuthors = (): Promise<Author[]> =>
  request({
    url: "/getData"
  });
