import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from '../pages/Main';
import Search from '../pages/Search';

const routes = () => (
  <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/search" component={Search} />
      </Switch>
  </BrowserRouter>
);

export default routes;