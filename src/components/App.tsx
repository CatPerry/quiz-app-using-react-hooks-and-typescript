import React, { FunctionComponent } from "react";
import {
  Switch,
  Route,
} from "react-router-dom";

import Card from './Card';
import MainContainer from './Main';

export const App: FunctionComponent = () => {
  return (
    <div>
      <Switch>
        <Route path="/:question">
          <Card />
        </Route>
        <Route exact path="/">
          <MainContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default App;