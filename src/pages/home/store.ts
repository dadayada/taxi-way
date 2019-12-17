import { isToday, fromUnixTime, isThisMonth, isThisWeek } from 'date-fns';
import { createStore, createEvent, combine } from 'effector';

import { $records, Record } from '../../core/records';
import { RECORD_TYPE } from '../../core/constants';

export enum ResultsType {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH'
}

const reduceDebit = (records: Record[]) =>
  records
    .filter(record => record.type === RECORD_TYPE.EXPENSE)
    .reduce((acc, record) => record.value + acc, 0);

const reduceCredit = (records: Record[]) =>
  records
    .filter(record => record.type === RECORD_TYPE.INCOME)
    .reduce((acc, record) => record.value + acc, 0);

const resultsTypeChanged = createEvent<ResultsType>();
const $currentResultsType = createStore(ResultsType.TODAY).on(
  resultsTypeChanged,
  (_, p) => p
);

const $results = combine(
  $records,
  $currentResultsType,
  (records, currentResultsType) => {
    const map: { [id: string] : (date: number | Date) => boolean; } = {}
    map[ResultsType.TODAY] = isToday;
    map[ResultsType.WEEK] = isThisWeek;
    map[ResultsType.MONTH] = isThisMonth;

    const intervalFunction = map[currentResultsType];
    const isRecordInInterval = (record: Record): boolean => intervalFunction(fromUnixTime(record.added));
    const recordsInInterval = records.filter(isRecordInInterval)
    return ({
      debit: reduceDebit(recordsInInterval),
      credit: reduceCredit(recordsInInterval)
    });
  }
);

export { $results, $currentResultsType, resultsTypeChanged };
