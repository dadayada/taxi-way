import React from 'react';
import { Link } from 'react-router-dom';
import {
  BottomNavigation as MUIBottomNavigation,
  BottomNavigationAction
} from '@material-ui/core';
import { PostAdd } from '@material-ui/icons';
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
        label="New record"
        icon={
          <Link to="add-record">
            <PostAdd />
          </Link>
        }
      />
       <BottomNavigationAction
        label="Pohuy"
        icon={
          <Link to="add-record">
            <PostAdd />
          </Link>
        }
      />
    </MUIBottomNavigation>
  );
}
