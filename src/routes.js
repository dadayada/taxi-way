import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { HomePage } from './screens/home';
import { AddRecordScreen } from './screens/add-record';
import { BottomNavigation } from './components/bottom-navigation';
import { HistoryScreen } from './screens/history';

export const history = createBrowserHistory({
  baseName: process.env.PUBLIC_URL
});

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path={process.env.PUBLIC_URL + '/add-record'}>
        <AddRecordScreen />
      </Route>
      <Route path={process.env.PUBLIC_URL + '/history'}>
        <HistoryScreen />
      </Route>
      <Route path={process.env.PUBLIC_URL + '/'}>
        <HomePage />
      </Route>
    </Switch>
    <BottomNavigation />
  </Router>
);
