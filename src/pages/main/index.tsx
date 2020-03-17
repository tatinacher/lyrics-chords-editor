import * as React from "react";
import { getAuthors, $authors } from "../../features/authors";
import { useStore } from "effector-react";

export const Main: React.FC = ({}) => {
  const authors = useStore($authors);
  React.useEffect(() => {
    getAuthors();
  }, []);
  if (!authors) return null;
  return (
    <div>
      {authors.map((author, index) => (
        <div key={index}>{author.author}</div>
      ))}
    </div>
  );
};
