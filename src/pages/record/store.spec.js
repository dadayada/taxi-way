import {
  $error,
  $recordValue,
  $type,
  editRecordPageRequested,
  recordValueChanged,
  saveRecordRequsted
} from './store';
import { recordAdded, recordChanged, $records } from '../../core/records';

describe('record view store', () => {
  let addedSpy;
  let changedSpy;
  let recordAddedSubscription;
  let recordChangedSubscription;

  beforeEach(() => {
    $error.setState($error.defaultState);
    $recordValue.setState($recordValue.defaultState);
    $type.setState($type.defaultState);
    addedSpy = jest.fn();
    changedSpy = jest.fn();
    recordAddedSubscription = recordAdded.watch(addedSpy);
    recordChangedSubscription = recordChanged.watch(changedSpy);
  });

  afterEach(() => {
    recordAddedSubscription.unsubscribe();
    recordChangedSubscription.unsubscribe();
  })

  test('should call recordAdded if data is valid', () => {
    recordValueChanged('sad')
    saveRecordRequsted();
    expect(addedSpy).toHaveBeenCalled();
  });

  test('should not call recordAdded if data is not valid', () => {
    saveRecordRequsted();
    expect(addedSpy).not.toHaveBeenCalled();
  });

  test('should call recordChanged if editRecordPageRequested was caled', () => {
    const recordId = (new Date()).toISOString();
    $records.setState([{ added: recordId  }]);
    editRecordPageRequested(recordId);
    recordValueChanged('sad')
    saveRecordRequsted();
    expect(changedSpy).toHaveBeenCalled();
  })

  test('should set $recordValue to record value if editRecordPageRequested was caled', () => {
    const recordId = (new Date()).toISOString();
    $records.setState([{ added: recordId, value: 'test'  }]);
    editRecordPageRequested(recordId);
    expect($recordValue.getState()).toBe('test');
  });
});
