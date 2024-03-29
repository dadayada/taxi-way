import { createHashHistory } from 'history';
import { createStore, createEvent } from 'effector';

export const history = createHashHistory();

export const locationChanged = createEvent<any>();
history.listen(locationChanged);
export const $location = createStore<any>(history.location).on(locationChanged, (_, p) => p);

