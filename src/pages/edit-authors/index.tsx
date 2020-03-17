import * as React from "react";
import { getAuthors, $authors, updateAuthor } from "../../features/authors";
import { changed, $form, onSubmit, setForm } from "../../features/edit-author";
import { useStore } from "effector-react";
import { PageHeader, List, Typography, Empty, Button, Input } from "antd";
import { Buttons, Form, Hidden, Container } from "./style";
import { Author } from "../../api/authors";
import { AddAuthor } from "./create-author";

export const ReadList: React.FC<{
  author: Author;
  onClick: (author: Author) => void;
}> = ({ author, onClick }) => (
  <List.Item>
    <Hidden>
      <Typography.Text>{author._id}</Typography.Text>
    </Hidden>
    <Typography.Text>{author.author}</Typography.Text>
    <Typography.Text>{author.description}</Typography.Text>
    <Buttons>
      <Button onClick={() => onClick(author)}>Change</Button>
      <Button danger>Delete</Button>
    </Buttons>
  </List.Item>
);

export const EditList: React.FC<{
  author: Author;
  onSave: () => void;
}> = ({ author, onSave }) => {
  const values = useStore($form);
  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit();
    onSave();
  };
  React.useEffect(() => {
    setForm(author);
  }, [author]);
  return (
    <Form onSubmit={submit}>
      <Hidden>
        <Input name="_id" value={values._id} disabled />
      </Hidden>
      <Input name="author" value={values.author} onChange={changed} />
      <Input name="description" value={values.description} onChange={changed} />
      <Buttons>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Buttons>
    </Form>
  );
};

export const EditAuthors: React.FC = () => {
  const authors = useStore($authors);
  const [changeAuthorId, setAuthorId] = React.useState<null | string>(null);

  React.useEffect(() => {
    getAuthors();
  }, []);

  const onSave = () => {
    setAuthorId(null);
  };
  if (!authors) return <Empty />;
  return (
    <Container>
      <Typography.Title>Authors</Typography.Title>
      <AddAuthor />
      <List>
        {authors.map(author => {
          if (author._id === changeAuthorId) {
            return (
              <EditList
                key={author._id}
                author={author}
                onSave={onSave}
              ></EditList>
            );
          } else {
            return (
              <ReadList
                key={author._id}
                author={author}
                onClick={author => setAuthorId(author._id)}
              ></ReadList>
            );
          }
        })}
      </List>
    </Container>
  );
};
