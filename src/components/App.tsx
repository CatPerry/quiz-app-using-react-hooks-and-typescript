import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import MainContainer from './Main';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <MainContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
