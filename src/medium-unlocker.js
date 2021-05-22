import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App/App.jsx';
import { getMeteredContentElement, hasMembershipPrompt, log } from './utils.js';
import { MEMBERSHIP_PROMPT_ID, POST_VIEW_MONTH_COUNT_KEY } from './constants.js';

let previousUrl = window.location.href;
let loaderElement;
const floatingContentDivId = 'mediumUnlimited';
const floatingButtonParent = document.createElement('div');
floatingButtonParent.setAttribute('id', floatingContentDivId);
document.body.appendChild(floatingButtonParent);
let yetToProcess = true;
function registerListeners() {
  _attachFloatingButton();
  /* Not the best way to detect url change but wrapping "history.pushState" or
    "history.replaceState" is not working. Needs debugging.
  */
    setInterval(() => {
      if (window.location.href != previousUrl) {
        previousUrl = window.location.href;
        window.location.href = window.location.href;
      }
      unlockIfHidden();
    }, 1500);
}

function unlockIfHidden() {
  _settingPostViewCount()
  if (!hasMembershipPrompt(document)) {
    log('Content is open, nothing to do');
    return;
  }
  if (!yetToProcess) {
    return;
  }
  yetToProcess = false;
  log('Content is hidden');
  _showLoader();
  fetch(window.location.href).then(resp => resp.text()).then((resp) => {
    const html = getHTMLFromText(resp);
    const articleContent = getMeteredContentElement(html);
    if (articleContent) {
      const meteredContentElement = getMeteredContentElement();
      meteredContentElement.parentElement.replaceChild(articleContent, meteredContentElement);
      articleContent.style.marginBottom = '5rem';
      loadBrokenImages();
      removePaywallSection();
      _hideLoader();
      restoreScrollPosition();
      return;
    }
  });
}

function restoreScrollPosition() {
  setTimeout(() => document.getElementsByTagName('h1')[0].scrollIntoView({behavior: 'smooth'}), 100);
}

function getHTMLFromText(text) {
  const html = document.createElement('html');
  html.innerHTML = text;
  return html;
}

function removePaywallSection() {
  const paywallContainer = loaderElement.parentElement.parentElement;
  const fadeElement = paywallContainer.previousSibling;
  if (!fadeElement || fadeElement.parentElement.getAttribute('id') === 'root') {
    removePaywallSectionAlternative();
    return;
  }
  paywallContainer.remove();
  fadeElement.remove();
}

function removePaywallSectionAlternative() {
  const fadeElement = loaderElement.previousSibling;
  fadeElement.remove();
}

function loadBrokenImages() {
  Array.from(document.querySelectorAll('img'))
    .filter(i => !i.hasAttribute('src') && i.nextSibling.tagName === 'NOSCRIPT')
    .forEach(i => i.outerHTML = i.nextSibling.innerHTML);
}

function _attachFloatingButton() {
  ReactDOM.render(<App />, floatingButtonParent);
}

function _removeFloatingButton() {
  ReactDOM.unmountComponentAtNode(floatingButtonParent);
}

function _hideLoader() {
  loaderElement.parentElement.removeChild(loaderElement);
}

function _showLoader() {
  const loaderUrl = chrome.extension.getURL('static/loader.gif');
  loaderElement = document.createElement('div');
  loaderElement.innerHTML = `
    <div style="margin: 50px; text-align: center;">
      Unlocking content, please wait...
      <img
        src="${loaderUrl}"
        style="width: 200px;">
    </div>
  `;
  loaderElement.src = loaderUrl;
  let membershipPromtElement = document.getElementById(
    MEMBERSHIP_PROMPT_ID
  );
  if (!membershipPromtElement) {
    const article = document.getElementsByTagName('article')[0];
    membershipPromtElement = article.nextSibling.nextSibling;
  }
  membershipPromtElement.parentElement.replaceChild(
    loaderElement,
    membershipPromtElement
  );
  if (document.getElementsByTagName('footer')[0]) {
    document.getElementsByTagName('footer')[0].style = 'margin-top: 100px;';
  }
  return loaderElement;
}

function _settingPostViewCount(count = 0) {
  try {
    const initCount = localStorage.getItem(POST_VIEW_MONTH_COUNT_KEY);
    if (initCount > 0) {
      log('Changing posts viewed month count');
      localStorage.setItem(POST_VIEW_MONTH_COUNT_KEY, count);
    }
  } catch (err) {

  }
}

registerListeners();