import { createStore, createEvent, sample, combine } from 'effector';
import { history, $location, locationChanged } from '../../routing';
import { RECORD_TYPE } from '../../core/constants';
import { recordAdded, recordChanged } from '../../core/records';

const recordTypeChanged = createEvent();
const recordValueChanged = createEvent();
const saveRecordRequsted = createEvent();

const $type = createStore(RECORD_TYPE.INCOME).on(
  recordTypeChanged,
  (_, p) => p
);

const $recordValue = createStore('').on(recordValueChanged, (_, p) => p);

sample({
  source: combine($type, $recordValue, $location, (type, value, location) => ({
    type,
    value: Number(value),
    location
  })),
  clock: saveRecordRequsted,
  fn: store => ({ ...store, added: new Date().toISOString() }),
  target: recordAdded
});

recordAdded.watch(() => history.push('/'));

$type.reset(locationChanged);
$recordValue.reset(locationChanged);

export {
  recordTypeChanged,
  recordValueChanged,
  $type,
  $recordValue,
  saveRecordRequsted
};
