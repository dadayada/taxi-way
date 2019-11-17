import { createBrowserHistory } from 'history';
import { createStore, createEvent } from 'effector';

export const history = createBrowserHistory({
  baseName: process.env.PUBLIC_URL
});

export const locationChanged = createEvent();
history.listen(locationChanged);
export const $location = createStore(history.location).on(locationChanged, (_, p) => p);

