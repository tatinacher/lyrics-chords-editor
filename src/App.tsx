import * as React from "react";
import { Editor } from "./features/editor";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Main, Song } from "./pages";

export const App: React.FC = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/edit">Edit</Link>
          </li>
          <li>
            <Link to="/song">Song</Link>
          </li>
        </ul>
      </nav>
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
    </div>
  </Router>
);
