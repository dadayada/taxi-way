import React from 'react';
import { useStore } from 'effector-react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { green, red } from '@material-ui/core/colors';
import { Delete, Edit } from '@material-ui/icons';
import { RECORD_TYPE } from '../../core/constants';
import { $records } from '../../core/records';
import { $modalOpen, removeBtnClicked, removeCancelled, removeConfirmed } from './store'

const useStyles = makeStyles({ 
  incomeText: {
    color: green[700],
    fontWeight: 'bold'
  },
  spendingText: {
    color: red[700],
    fontWeight: 'bold'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export function HistoryScreen() {
  const records = useStore($records);
  const modalOpen = useStore($modalOpen);
  const classes = useStyles();

  
  return (
    <>
      {' '}
      {records.map(record => (
        <div key={record.added}>
          <div className={classes.content}>
            <div>
              <Typography align="center">
                {new Date(record.added).toLocaleDateString()}
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
            </div>
            <IconButton onClick={() => removeBtnClicked(record.added)}>
              <Delete />
            </IconButton>
            <Link to={`/edit-record/${record.added}`}>
              <IconButton>
                <Edit />
              </IconButton>
            </Link>
          </div>
          <Divider />
        </div>
      ))}
      <Dialog open={modalOpen}>
        <DialogContent>Are you sure you want remove this record?</DialogContent>
        <DialogActions>
          <Button onClick={removeConfirmed}>Remove</Button>
          <Button onClick={removeCancelled}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
