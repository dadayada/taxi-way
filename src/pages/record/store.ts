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

const recordTypeChanged = createEvent<RECORD_TYPE>();
const recordValueChanged = createEvent<string>();
const saveRecordRequsted = createEvent();
const editRecordPageMounted = createEvent<string>();

const recordToEditPicked = sample({
  source: $records,
  clock: editRecordPageMounted,
  fn: (records, recordAdded) => records.find(el => el.added === recordAdded)
});

const existedRecordToEditPicked = recordToEditPicked.filterMap(record => Boolean(record) ? record : undefined);

const recordToEdit = restore(existedRecordToEditPicked, null);

const $type = createStore<RECORD_TYPE>(RECORD_TYPE.INCOME)
  .on(recordTypeChanged, (_, p) => p)
  .on(existedRecordToEditPicked, (_, { type }) => type);

const $recordValue = createStore('')
  .on(recordValueChanged, (_, p) => p)
  .on(existedRecordToEditPicked, (_, { value }) => String(value));

const recordToSavePrepared = sample(
  createStoreObject({
    type: $type,
    value: $recordValue,
    recordToEdit
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
  data: recordToEdit,
  filter: {
    recordAdded: recordToEdit => !Boolean(recordToEdit),
    recordChanged: recordToEdit => Boolean(recordToEdit),
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
  editRecordPageMounted
};
