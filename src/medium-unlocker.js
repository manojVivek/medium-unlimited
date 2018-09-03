import {log} from './utils';
import {contentSectionClassName, membershipPromptClassName} from './constants';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App/App.jsx';

const floatingContentDivId = 'mediumUnlimited';
const hiddenClassName = 'mediumUnlimitedHidden';
const visibleClassName = 'mediumUnlimitedVisible';
const floatingButtonParent = document.createElement('div');
floatingButtonParent.setAttribute('id', 'mediumUnlimited');
document.body.appendChild(floatingButtonParent);
let previousUrl;
let loaderElement;
function registerListeners() {
  /* Not the best way to detect url change but wrapping "history.pushState" or
    "history.replaceState" is not working. Needs debugging.
  */
  setInterval(() => {
    if (window.location.href != previousUrl) {
      previousUrl = window.location.href;
      setTimeout(unlockIfHidden, 1500); //Again, arbitrary 1 sec, might break.
    }
  }, 500);
}

registerListeners();

function unlockIfHidden() {
  if (!_hasMembershipPrompt()) {
    log('Content is open, nothing to do');
    _removeFloatingButton();
    return;
  }
  log('Content is hidden');
  _showLoader();
  log('Sending message to fetch', document.location.href);
  chrome.runtime.sendMessage(
    {type: 'fetchContent', url: document.location.href},
    response => {
      log('Received response for fetchContent');
      _setContent(response);
      _hideLoader();
      _attachFloatingButton();
    }
  );
}

function _attachFloatingButton() {
  ReactDOM.render(<App />, floatingButtonParent);
}

function _removeFloatingButton() {
  ReactDOM.unmountComponentAtNode(floatingButtonParent);
}

function _setContent(response) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = response.content.trim();
  const innerSection = document.getElementsByClassName(
    contentSectionClassName
  )[0];
  innerSection.parentElement.replaceChild(tempDiv.firstChild, innerSection);
}

function _hideLoader() {
  loaderElement.parentElement.removeChild(loaderElement);
}

function _showLoader() {
  const loaderUrl = chrome.extension.getURL('static/loader.gif');
  loaderElement = document.createElement('div');
  loaderElement.innerHTML = `
    <div style="padding: 25px; text-align: center;">
      Unlocking content, please wait...
      <img
        src="${loaderUrl}"
        style="width: 200px;">
    </div>
  `;
  loaderElement.src = loaderUrl;
  const membershipPromtElement = document.getElementsByClassName(
    membershipPromptClassName
  )[0];
  membershipPromtElement.parentElement.replaceChild(
    loaderElement,
    membershipPromtElement
  );
  document.getElementsByTagName('footer')[0].style = 'margin-top: 100px;';
  return loaderElement;
}

function _hasMembershipPrompt() {
  return document.getElementsByClassName(membershipPromptClassName).length > 0;
}
