import React from 'react';
import { Link } from 'react-router-dom';
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import { PostAdd, History, Home } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%'
  }
}));

export function BottomNavigation() {
  const classes = useStyles();
  return (
    <MUIBottomNavigation value={0} showLabels className={classes.root}>
      <BottomNavigationAction
        label="Main"
        icon={<Home />}
        component={Link}
        to={process.env.PUBLIC_URL + '/'}
      />
      <BottomNavigationAction
        label="New record"
        icon={<PostAdd />}
        component={Link}
        to={process.env.PUBLIC_URL + '/add-record'}
      />
      <BottomNavigationAction
        label="History"
        icon={<History />}
        component={Link}
        to={process.env.PUBLIC_URL + '/history'}
      />
    </MUIBottomNavigation>
  );
}
