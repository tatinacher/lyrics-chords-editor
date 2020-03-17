import * as React from "react";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { Main, Song, Editor } from "./pages";
import { Layout, Menu } from "antd";
const { Header, Content } = Layout;

export const App: React.FC = () => {
  const location = useLocation();
  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          //defaultSelectedKeys={["3"]}
          style={{ lineHeight: "64px" }}
          selectedKeys={[location.pathname]}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/edit">
            <Link to="/edit">Edit</Link>
          </Menu.Item>
          <Menu.Item key="/song">
            <Link to="/song">Song</Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Switch>
          <Route path="/edit">
            <Editor />
          </Route>
          <Route path="/song">
            <Song />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </Content>
    </Layout>
  );
};
