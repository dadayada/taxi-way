import { createStore, createEvent, sample, combine } from 'effector'
import { history } from '../../routes'
import { RECORD_TYPE } from '../../core/constants'
import { removeRecord, recordAdded } from '../../core/records'

const recordTypeChanged = createEvent()
const recordValueChanged = createEvent()
const removeBtnClicked = createEvent()
const removeCancelled = createEvent()
const addRecordBtnClicked = createEvent()

const $modalOpen = createStore(false)
  .on(removeBtnClicked, () => true)
  .on(removeRecord, () => false)
  .on(removeCancelled, () => false)

const $type = createStore(RECORD_TYPE.INCOME).on(recordTypeChanged, (_, p) => p)

const $recordValue = createStore('').on(recordValueChanged, (_, p) => p)


sample({
  source: combine($type, $recordValue, (type, value) => ({
    type,
    value: Number(value)
  })),
  clock: addRecordBtnClicked,
  fn: store => ({ ...store, added: new Date().toISOString() }),
  target: recordAdded
})

recordAdded.watch(() => history.push('/'))

$type.reset(recordAdded)
$recordValue.reset(recordAdded)

export {
  recordTypeChanged,
  recordValueChanged,
  $type,
  $recordValue,
  $modalOpen,
  addRecordBtnClicked,
  removeBtnClicked,
  removeCancelled
}
