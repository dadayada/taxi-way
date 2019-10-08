import React from 'react';
import {
  Paper,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  Button
} from '@material-ui/core';
import { useStore } from 'effector-react';
import {
  $type,
  recordTypeChanged,
  $recordValue,
  recordValueChanged,
  recordPushed
} from './store';
import { RECORD_TYPE } from '../../core/constants';

export function AddRecordScreen() {
  const recordType = useStore($type);
  const recordValue = useStore($recordValue);
  return (
    <FormControl>
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
        label="Value"
        placeholder="Enter value"
        type="number"
        value={recordValue}
        onChange={e => recordValueChanged(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={recordPushed}>
        Add
      </Button>
    </FormControl>
  );
}
