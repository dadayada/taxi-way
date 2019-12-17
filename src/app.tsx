import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core'
import { HomePage } from './pages/home';
import { RecordScreen } from './pages/record';
import { BottomNavigation } from './components/bottom-navigation';
import { HistoryScreen } from './pages/history';
import { history } from './routing';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'auto',
    padding: theme.spacing(),
  }
}));

export const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route path='/add-record'>
        <RecordScreen recordIsCreating/>
      </Route>
      <Route path='/edit-record/:added'>
        <RecordScreen />
      </Route>
      <Route path='/history'>
        <HistoryScreen />
      </Route>
      <Route path='/'>
        <HomePage />
      </Route>
    </Switch>
    <BottomNavigation />
  </Router>
);

export function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Routes />
    </div>
  );
}
