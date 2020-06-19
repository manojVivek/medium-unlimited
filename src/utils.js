import {MEMBERSHIP_PROMPT_CLASSNAME} from './constants';

export function log(...messages) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(...messages);
}

export function init() {
  chrome.runtime.setUninstallURL('https://manojvivek.typeform.com/to/c0VaBs');
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
  const computedStyles = (document.defaultView || window).getComputedStyle(article.nextSibling);
  if (!computedStyles.background) {
    return false;
  }
  return computedStyles.background.indexOf('linear-gradient') > -1;
}

export function hasMembershipPrompt(document) {
  return (
    document.getElementsByClassName(MEMBERSHIP_PROMPT_CLASSNAME).length > 0 ||
    hasMembershipPromptNew(document)
  );
}

export function getTwitterReferer() {
  return `https://t.co/${Math.random().toString(36).slice(2)}`;
}
