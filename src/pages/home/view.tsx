import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Box,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { useStore } from 'effector-react';

import {
  $results,
  $currentResultsType,
  ResultsType,
  resultsTypeChanged
} from './store';

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
  const results = useStore($results);
  const currentResultsType = useStore($currentResultsType);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center">
          <FormControl component="fieldset">
            <FormLabel component="legend">Results for period:</FormLabel>
            <RadioGroup
              aria-label="position"
              name="position"
              row
              value={currentResultsType}
              onChange={event =>
                resultsTypeChanged(event.target.value as ResultsType)
              }
            >
              <FormControlLabel
                value={ResultsType.TODAY}
                control={<Radio />}
                label="Today"
              />
              <FormControlLabel
                value={ResultsType.WEEK}
                control={<Radio />}
                label="Week"
              />
              <FormControlLabel
                value={ResultsType.MONTH}
                control={<Radio />}
                label="Month"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="caption">
            Credit
          </Typography>
        </Box>
        <Typography className={classes.incomeText} align="center" variant="h4">
          {results.credit}
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
          {results.debit}
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography align="center" variant="caption">
            Balance
          </Typography>
        </Box>
        <Typography
          className={
            results.credit - results.debit > 0
              ? classes.incomeText
              : classes.spendingText
          }
          align="center"
          variant="h4"
        >
          {results.credit - results.debit}
        </Typography>
      </Grid>
    </Grid>
  );
}
