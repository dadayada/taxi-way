const localStorageKey = 'taxi-data';

export function addDataToLocalStorage(data) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export function getDataFromLocalStorage() {
  return JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
}
