import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App/App.jsx';
import { hasMembershipPrompt, log } from './utils.js';
import { MEMBERSHIP_PROMPT_CLASSNAME, MEMBERSHIP_PROMPT_ID } from './constants.js';

let previousUrl;
let loaderElement;
const floatingContentDivId = 'mediumUnlimited';
const floatingButtonParent = document.createElement('div');
floatingButtonParent.setAttribute('id', floatingContentDivId);
document.body.appendChild(floatingButtonParent);
function registerListeners() {
  _attachFloatingButton();
  /* Not the best way to detect url change but wrapping "history.pushState" or
    "history.replaceState" is not working. Needs debugging.
  */
    setInterval(() => {
      if (window.location.href != previousUrl) {
        previousUrl = window.location.href;
        _removeFloatingButton();
      }
      unlockIfHidden();
    }, 1500);
}

function unlockIfHidden() {
  if (!hasMembershipPrompt(document)) {
    log('Content is open, nothing to do');
    return;
  }
  log('Content is hidden');
  _showLoader();
  window.location.reload();
}

registerListeners();

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
