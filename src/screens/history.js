import React from 'react';
import { $records } from '../core/records';
import { useStore } from 'effector-react';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { green, red } from '@material-ui/core/colors';
import { RECORD_TYPE } from '../core/constants';

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

export function HistoryScreen() {
  const records = useStore($records);
  const classes = useStyles();
  return records.map(record => (
    <div key={record.added}>
      <Typography align="center">
        {new Date(record.added).toLocaleDateString()}, {new Date(record.added).toLocaleTimeString()}
      </Typography>
      <Typography
        align="center"
        className={
          record.type === RECORD_TYPE.EXPENSE
            ? classes.spendingText
            : classes.incomeText
        }
        variant="subtitle2"
      >
        {record.type === RECORD_TYPE.EXPENSE && '- '}
        {record.value}
      </Typography>
      <Divider />
    </div>
  ));
}
