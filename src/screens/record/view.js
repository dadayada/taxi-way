import React from 'react'
import {
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  FormControlLabel,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core'
import { useStore } from 'effector-react'
import {
  $type,
  recordTypeChanged,
  $recordValue,
  recordValueChanged,
  addRecordBtnClicked,
} from './store'
import { RECORD_TYPE } from '../../core/constants'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    margin: `${theme.spacing() * 2}px 0px`
  }
}))

export function RecordScreen(props) {
  const { recordIsCreating } = props
  const recordType = useStore($type)
  const recordValue = useStore($recordValue)
  const classes = useStyles()
  return (
    <>
      <FormControl className={classes.root}>
        <Typography align="center" variant="h4">
          {recordIsCreating ? 'New record' : 'Edit record'}
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
          label="Value"
          placeholder="Enter value"
          type="number"
          value={recordValue}
          onChange={e => recordValueChanged(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addRecordBtnClicked}
          className={classes.button}
        >
          {recordIsCreating ? 'Add' : 'Save'}
        </Button>
      </FormControl>
      <Dialog>
        <DialogContent>Are you sure you want remove this record?</DialogContent>
        <DialogActions>
          <Button>Remove</Button>
          <Button>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
