import React from 'react'
import { useStore } from 'effector-react'
import { Link } from 'react-router-dom'
import { Typography, Divider, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { green, red } from '@material-ui/core/colors'
import { Delete, Edit } from '@material-ui/icons'
import { RECORD_TYPE } from '../core/constants'
import { $records, removeRecord } from '../core/records'

const useStyles = makeStyles(theme => ({
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
}))

export function HistoryScreen() {
  const records = useStore($records)
  const classes = useStyles()
  return records.map(record => (
    <div key={record.added}>
      <div className={classes.content}>
        <div>
          <Typography align="center">
            {new Date(record.added).toLocaleDateString()},{' '}
            {new Date(record.added).toLocaleTimeString()}
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
        <IconButton onClick={() => removeRecord(record.added)}>
          <Delete />
        </IconButton>
        <Link to="/edit-record">
          <IconButton>
            <Edit />
          </IconButton>
        </Link>
      </div>
      <Divider />
    </div>
  ))
}
