import * as React from "react";
import { $author, changed, onSubmitAdd } from "../../features/edit-author";
import { useStore } from "effector-react";
import { Button, Input, PageHeader, Typography } from "antd";
import { Form } from "./style";

export const AddAuthor: React.FC = () => {
  const values = useStore($author);
  const submit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmitAdd();
  };
  return (
    <>
      <Typography.Text>Add author</Typography.Text>

      <Form onSubmit={submit}>
        <Input name="author" value={values.author} onChange={changed} />
        <Input
          name="description"
          value={values.description}
          onChange={changed}
        />
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </>
  );
};
