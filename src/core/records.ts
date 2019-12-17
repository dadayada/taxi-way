import { createStore, createEvent } from 'effector';
import { RECORD_TYPE } from './constants';
import { addDataToLocalStorage, getDataFromLocalStorage } from '../persistence';

export const removeRecord = createEvent<number>();
export const recordAdded = createEvent<Record>();
export const recordChanged = createEvent<Record>();

export type Record = {
    added: number,
    type: RECORD_TYPE,
    value: number
  }

export const $records = createStore<Record[]>(getDataFromLocalStorage())
  .on(recordAdded, (s, p) => [...s, p])
  .on(removeRecord, (s, p) => s.filter(el => el.added !== p))
  .on(recordChanged, (s, p) => s.map(el => (el.added === p.added ? p : el)));

$records.watch(addDataToLocalStorage);
