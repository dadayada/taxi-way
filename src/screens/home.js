import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import { Typography, Divider, IconButton, Box } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { PostAdd } from '@material-ui/icons';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';

import { $totalExpenses, $totalIncome } from '../core/records';

const useStyles = makeStyles(theme => ({
  incomeText: {
    color: green[700],
    fontWeight: 'bold'
  },
  spendingText: {
    color: red[700],
    fontWeight: 'bold'
  }
}));

export function HomePage() {
  const classes = useStyles();
  const totalIncome = useStore($totalIncome);
  const totalExpenses = useStore($totalExpenses);
  return (
    <div>
      <Typography variant="caption">Today {(new Date()).toLocaleDateString()}</Typography>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography align="center" variant="h4" cene>
          Income
        </Typography>
      </Box>
      <Typography
        className={classes.incomeText}
        align="center"
        variant="h4"
      >
        {totalIncome}
      </Typography>

      <Divider variant="middle" />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography align="center" variant="h4" cene>
          Expenses
        </Typography>
      </Box>
      <Typography
        className={classes.spendingText}
        align="center"
        variant="h4"
        cene
      >
        {totalExpenses}
      </Typography>
      <Divider variant="middle" />
    </div>
  );
}
