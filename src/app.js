import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Routes } from './routes';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
    overflow: 'auto',
    padding: theme.spacing()
  }
}));

export function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Routes />
    </div>
  );
}
