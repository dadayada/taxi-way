import { createStore, createEvent } from 'effector';
import { RECORD_TYPE } from './constants';
import { addDataToLocalStorage, getDataFromLocalStorage } from '../persistence';

export const removeRecord = createEvent();
export const recordAdded = createEvent();

/*
  type Record {
    added: string,
    type: 'INCOME' | 'EXPENSE',
    value: number
  }
*/

export const $records = createStore(getDataFromLocalStorage())
  .on(recordAdded, (s, p) => [...s, p])
  .on(removeRecord, (s, p) => s.filter(el => el.added !== p));

$records.watch(addDataToLocalStorage);

export const $totalIncome = $records.map(records =>
  records
    .filter(record => record.type === RECORD_TYPE.INCOME)
    .reduce((acc, record) => record.value + acc, 0)
);

export const $totalExpenses = $records.map(records =>
  records
    .filter(record => record.type === RECORD_TYPE.EXPENSE)
    .reduce((acc, record) => record.value + acc, 0)
);

export const $profit = $records.map(records =>
  records.reduce(
    (acc, record) =>
      record.type === RECORD_TYPE.INCOME
        ? acc + record.value
        : acc - record.value,
    0
  )
);
