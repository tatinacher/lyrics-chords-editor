import * as React from "react";
import { getAuthors, $authors } from "../../features/authors";
import { useStore } from "effector-react";
import { PageHeader, List, Typography, Empty } from "antd";

export const Main: React.FC = () => {
  const authors = useStore($authors);
  React.useEffect(() => {
    getAuthors();
  }, []);
  if (!authors) return <Empty />;
  return (
    <div>
      <PageHeader title="Authors" />
      <List
        dataSource={authors}
        renderItem={author => (
          <List.Item>
            <Typography.Text>{author.author}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};
