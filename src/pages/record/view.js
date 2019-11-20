import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
import { useStore } from 'effector-react';
import {
  $type,
  $error,
  recordTypeChanged,
  $recordValue,
  recordValueChanged,
  saveRecordRequsted,
  editRecordPageRequested
} from './store';
import { RECORD_TYPE } from '../../core/constants';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    margin: `${theme.spacing() * 2}px 0px`
  },
  error: {
    color: 'red'
  }
}));

export function RecordScreen(props) {
  const { recordIsCreating } = props;
  const recordType = useStore($type);
  const recordValue = useStore($recordValue);
  const error = useStore($error);
  const classes = useStyles();
  const params = useParams();

  useEffect(() => {
    if (params.added) {
      editRecordPageRequested(params.added);
    }
  }, []);

  return (
    <>
      <FormControl className={classes.root}>
        <Typography align="center" variant="h4">
          {recordIsCreating ? 'New transaction' : 'Edit transaction'}
        </Typography>
        <FormLabel component="legend">Type</FormLabel>
        <RadioGroup
          value={recordType}
          onChange={e => recordTypeChanged(e.target.value)}
        >
          <FormControlLabel
            control={<Radio />}
            value={RECORD_TYPE.INCOME}
            label="Income"
          />
          <FormControlLabel
            control={<Radio />}
            value={RECORD_TYPE.EXPENSE}
            label="Expense"
          />
        </RadioGroup>
        <TextField
          autoFocus
          error={Boolean(error)}
          label="Value"
          placeholder="Enter value"
          type="number"
          value={recordValue}
          onChange={e => recordValueChanged(e.target.value)}
        />
        {error && (
          <Typography variant="caption" className={classes.error}>
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={saveRecordRequsted}
          className={classes.button}
        >
          {recordIsCreating ? 'Add' : 'Save'}
        </Button>
      </FormControl>
    </>
  );
}
