import config from './config';
import {setUserId, getUserId} from './storage';
import {track} from './analytics';
import {
  MEMBERSHIP_PROMPT_CLASSNAME,
  MEMBERSHIP_PROMPT_ID,
  METERED_CONTENT_CLASSNAME,
} from './constants';

const contextMenuId = 'delete_cookies_context';

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
    createCookiesContextMenu();
    if (!getUserId()) {
      setUserId(new Date().getTime().toString());
      track('INSTALLED');
    }
  });
}

export function createCookiesContextMenu() {
  chrome.contextMenus.remove(contextMenuId, () => chrome.runtime.lastError);
  //remove the id if context menu already created
  chrome.contextMenus.create({
    id: contextMenuId,
    type: 'normal',
    checked: false,
    title: 'Delete all cookies',
    contexts: ['page_action', 'browser_action', 'page'],
  });
  chrome.contextMenus.onClicked.addListener(deleteAllCookies);
}
export function deleteAllCookies() {
  chrome.cookies.getAll({}, function (cookies) {
    cookies.forEach((cookie) => {
      cookie.domain = 'https://' + cookie.domain;
      if (cookie.domain.startsWith('https://.')) {
        cookie.domain = cookie.domain.replace('https://.', 'https://*.');
      }
      chrome.cookies.remove({
        url: cookie.domain + cookie.path,
        name: cookie.name,
      });
    });
  });
  return;
}

export function urlWithoutQueryParams(url) {
  if (!url) {
    return '';
  }
  return url.split('?')[0];
}

function hasMembershipPromptNew(document) {
  const article = document.getElementsByTagName('article')[0];
  if (!article) {
    return false;
  }
  const computedStyles = (document.defaultView || window).getComputedStyle(
    article.nextSibling
  );
  if (!computedStyles.background) {
    return false;
  }
  return computedStyles.background.indexOf('linear-gradient') > -1;
}

export function hasMembershipPrompt(document) {
  return (
    document.getElementById(MEMBERSHIP_PROMPT_ID) ||
    hasMembershipPromptNew(document)
  );
}

export function getTwitterReferer() {
  return `https://t.co/${Math.random().toString(36).slice(2)}`;
}

export function getMeteredContentElement(doc) {
  return (doc || document).getElementsByClassName(METERED_CONTENT_CLASSNAME)[0];
}
