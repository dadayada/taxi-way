import React from 'react';
import { createEvent, restore } from 'effector'
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Grid } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { useStore } from 'effector-react';
import { isToday } from 'date-fns';

import { $records } from '../core/records';
import { RECORD_TYPE } from '../core/constants';
import { combine } from 'effector';

const $todaysRecords = $records.map(records =>
  records.filter(record => isToday(new Date(record.added)))
);

const $todaysDebit = $todaysRecords.map(records =>
  records
    .filter(record => record.type === RECORD_TYPE.EXPENSE)
    .reduce((acc, record) => record.value + acc, 0)
);

const $todaysCredit = $todaysRecords.map(records =>
  records
    .filter(record => record.type === RECORD_TYPE.INCOME)
    .reduce((acc, record) => record.value + acc, 0)
);

const $todayBalance = combine(
  $todaysDebit,
  $todaysCredit,
  (debit, credit) => credit - debit
);

const useStyles = makeStyles({
  incomeText: {
    color: green[700],
    fontWeight: 'bold'
  },
  spendingText: {
    color: red[700],
    fontWeight: 'bold'
  }
});

export function HomePage() {
  const classes = useStyles();
  const totalIncome = useStore($todaysCredit);
  const totalExpenses = useStore($todaysDebit);
  const profit = useStore($todayBalance);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography align="center">Today's transactions:</Typography>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="caption">
            Credit
          </Typography>
        </Box>
        <Typography className={classes.incomeText} align="center" variant="h4">
          {totalIncome}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="caption">
            Debit
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
          <Typography align="center" variant="caption">
            Balance
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
