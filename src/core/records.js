import { createStore, createEvent } from 'effector';
import { recordPushRequested } from '../screens/add-record';
import { RECORD_TYPE } from './constants';

const removeRecord = createEvent();

/*
  type Record {
    added: string,
    type: 'INCOME' | 'EXPENSE',
    value: number
  }
*/

export const $records = createStore([])
  .on(recordPushRequested, (s, p) => [...s, p])
  .on(removeRecord, (s, p) => s.filter(el => el.added !== p.added));

$records.watch(console.log);

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
