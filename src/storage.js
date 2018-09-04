import {USER_ID_KEY, READ_COUNT_KEY} from './constants';

export function setUserId(id) {
  window.localStorage.setItem(USER_ID_KEY, id);
}

export function getUserId() {
  return window.localStorage.getItem(USER_ID_KEY);
}

export function incrementReadCountAndGet() {
  let readCount = window.localStorage.getItem(READ_COUNT_KEY);
  if (!readCount) {
    readCount = '0';
  }
  const newReadCount = parseInt(readCount, 10) + 1;
  window.localStorage.setItem(READ_COUNT_KEY, newReadCount.toString());
  return newReadCount;
}
