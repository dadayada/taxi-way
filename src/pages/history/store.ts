import { createStore, createEvent, guard, sample } from 'effector';
import { removeRecord } from '../../core/records';

const removeBtnClicked = createEvent<string>();
const removeCancelled = createEvent<any>();
const removeConfirmed = createEvent<any>();

const $modalOpen = createStore(false)
  .on(removeBtnClicked, () => true)
  .on(removeRecord, () => false)
  .on(removeCancelled, () => false);

const $recordIdToRemove = createStore<string | null>(null)
  .on(removeBtnClicked, (_, p) => p)
  .on(removeRecord, () => null)
  .on(removeCancelled, () => null);

const $recordIdDefined = $recordIdToRemove.map(Boolean);

guard ({
  source: sample($recordIdToRemove, removeConfirmed),
  filter: $recordIdDefined,
  target: removeRecord,
});

export {
  $modalOpen,
  $recordIdToRemove,
  removeBtnClicked,
  removeCancelled,
  removeConfirmed
};
