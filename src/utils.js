import config from './config';
import {setUserId, getUserId} from './storage';
import {track} from './analytics';
import {MEMBERSHIP_PROMPT_CLASSNAME} from './constants';

export function log(...messages) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(...messages);
}

export function amplitudeApiKey() {
  if (process.env.NODE_ENV === 'production') {
    return config.amplitude.api_key;
  }
  return 'test_api_key';
}

export function init() {
  chrome.runtime.setUninstallURL('https://manojvivek.typeform.com/to/c0VaBs');
  chrome.runtime.onInstalled.addListener(() => {
    if (!getUserId()) {
      setUserId(new Date().getTime().toString());
      track('INSTALLED');
    }
  });
}

export function urlWithoutQueryParams(url) {
  if (!url) {
    return '';
  }
  return url.split('?')[0];
}

export function hasMembershipPrompt(document) {
  return (
    document.getElementsByClassName(MEMBERSHIP_PROMPT_CLASSNAME).length > 0
  );
}
