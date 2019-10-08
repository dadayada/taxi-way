import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { HomePage } from './screens/home';
import { AddRecordScreen } from './screens/add-record';
import { BottomNavigation } from './components/bottom-navigation'

export const history = createBrowserHistory();

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path="/add-record">
        <AddRecordScreen />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
    <BottomNavigation />
  </Router>
);
