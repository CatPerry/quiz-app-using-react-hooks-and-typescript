import _ from 'lodash';
import React, { FunctionComponent } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';

const Header: FunctionComponent = (props: {}) => {
  return (
    <Router>
      <div className="Header">
        {_.get(props, 'results.category') ? _.get(props, 'results.category') : 'Welcome to the Trivia Challenge!'}
      </div>
    </Router>
  );
};

export default Header;
