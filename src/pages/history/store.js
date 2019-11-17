import { createStore, createEvent, sample } from 'effector';
import { removeRecord } from '../../core/records';

const removeBtnClicked = createEvent();
const removeCancelled = createEvent();
const removeConfirmed = createEvent();

const $modalOpen = createStore(false)
  .on(removeBtnClicked, () => true)
  .on(removeRecord, () => false)
  .on(removeCancelled, () => false);

const $recordIdToRemove = createStore(null)
  .on(removeBtnClicked, (_, p) => p)
  .on(removeRecord, () => null)
  .on(removeCancelled, () => null);

sample({
  source: $recordIdToRemove,
  clock: removeConfirmed,
  target: removeRecord,
  fn: p => p
});

export {
  $modalOpen,
  $recordIdToRemove,
  removeBtnClicked,
  removeCancelled,
  removeConfirmed
};
