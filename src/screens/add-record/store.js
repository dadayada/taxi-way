import { createStore, createEvent, sample, combine } from 'effector';
import { history } from '../../routes';
import { RECORD_TYPE } from '../../core/constants';

const recordTypeChanged = createEvent();
const recordValueChanged = createEvent();
const recordPushed = createEvent();

const $type = createStore(RECORD_TYPE.INCOME).on(
  recordTypeChanged,
  (_, p) => p
);

const $recordValue = createStore('').on(recordValueChanged, (_, p) => p);

const recordPushRequested = sample(
  combine($type, $recordValue, (type, value) => ({ type, value: Number(value) })),
  recordPushed,
  store => ({ ...store, added: new Date().toISOString() })
);

recordPushRequested.watch(() => history.push('/'));

$type.reset(recordPushRequested);
$recordValue.reset(recordPushRequested);

export {
  recordTypeChanged,
  recordValueChanged,
  recordPushed,
  $type,
  $recordValue,
  recordPushRequested
};
