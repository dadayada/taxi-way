import { createStore, createEvent, guard, sample } from 'effector';
import { removeRecord, $records } from '../../core/records';

const removeBtnClicked = createEvent<number>();
const removeCancelled = createEvent<any>();
const removeConfirmed = createEvent<any>();

const $recordsForHistory = $records.map(records =>
  records.sort((a, b) => b.added - a.added)
);

const $modalOpen = createStore(false)
  .on(removeBtnClicked, () => true)
  .on(removeRecord, () => false)
  .on(removeCancelled, () => false);

const $recordIdToRemove = createStore<number | null>(null)
  .on(removeBtnClicked, (_, p) => p)
  .on(removeRecord, () => null)
  .on(removeCancelled, () => null);

const $recordIdDefined = $recordIdToRemove.map(Boolean);

guard({
  source: sample($recordIdToRemove, removeConfirmed),
  filter: $recordIdDefined,
  target: removeRecord
});

export {
  $modalOpen,
  $recordsForHistory,
  $recordIdToRemove,
  removeBtnClicked,
  removeCancelled,
  removeConfirmed
};
