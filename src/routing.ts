import { createBrowserHistory } from 'history';
import { createStore, createEvent } from 'effector';

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
});

export const locationChanged = createEvent<any>();
history.listen(locationChanged);
export const $location = createStore<any>(history.location).on(locationChanged, (_, p) => p);

