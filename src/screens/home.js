import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Grid } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { useStore } from 'effector-react';

import { $totalExpenses, $totalIncome, $profit } from '../core/records';

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
  const profit = useStore($profit);
  return (
    <Grid container>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="subtitle1">
            Income
          </Typography>
        </Box>
        <Typography className={classes.incomeText} align="center" variant="h4">
          {totalIncome}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="subtitle1">
            Expenses
          </Typography>
        </Box>
        <Typography
          className={classes.spendingText}
          align="center"
          variant="h4"
        >
          {totalExpenses}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="subtitle1">
            Profit
          </Typography>
        </Box>
        <Typography
          className={profit > 0 ? classes.incomeText : classes.spendingText}
          align="center"
          variant="h4"
        >
          {profit}
        </Typography>
      </Grid>
    </Grid>
  );
}
