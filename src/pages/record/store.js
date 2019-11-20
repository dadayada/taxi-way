import {
  createStore,
  createEvent,
  sample,
  restore,
  createStoreObject,
  split,
  merge
} from 'effector';
import { history, locationChanged } from '../../routing';
import { RECORD_TYPE } from '../../core/constants';
import { recordAdded, recordChanged, $records } from '../../core/records';
import { guardShape } from '../../util';

const recordTypeChanged = createEvent();
const recordValueChanged = createEvent();
const saveRecordRequsted = createEvent();
const editRecordPageRequested = createEvent();

const recordToEditPicked = sample({
  source: $records,
  clock: editRecordPageRequested,
  fn: (records, recordAdded) => records.find(el => el.added === recordAdded)
});

const $type = createStore(RECORD_TYPE.INCOME)
  .on(recordTypeChanged, (_, p) => p)
  .on(recordToEditPicked, (_, { type }) => type);

const $recordValue = createStore('')
  .on(recordValueChanged, (_, p) => p)
  .on(recordToEditPicked, (_, { value }) => value);

const recordToSavePrepared = sample(
  createStoreObject({
    type: $type,
    value: $recordValue,
    recordToEdit: restore(recordToEditPicked, null)
  }),
  saveRecordRequsted,
  ({ recordToEdit, type, value }) =>
    recordToEdit
      ? { type, value: Number(value), added: recordToEdit.added }
      : { type, value: Number(value), added: new Date().toISOString() }
);

const recordToSaveValidated = split(recordToSavePrepared, {
  recordValid: p => Boolean(p.value),
  valueEmpty: p => !Boolean(p.value)
});

guardShape(recordToSaveValidated.recordValid, {
  target: { recordAdded, recordChanged },
  data: restore(recordToEditPicked, null),
  filter: {
    recordAdded: recordToEdit => !recordToEdit,
    recordChanged: recordToEdit => recordToEdit
  }
});

const $error = createStore('')
  .on(recordToSaveValidated.valueEmpty, () => 'Record cannot be empty')
  .reset(merge([recordValueChanged, locationChanged]));

recordAdded.watch(() => history.push('/'));
recordChanged.watch(() => history.push('/'));

$type.reset(locationChanged);
$recordValue.reset(locationChanged);

export {
  recordTypeChanged,
  recordValueChanged,
  $type,
  $recordValue,
  $error,
  saveRecordRequsted,
  editRecordPageRequested
};
