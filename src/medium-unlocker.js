import {log, hasMembershipPrompt} from './utils';
import {
  CONTENT_SECTION_CLASSNAME,
  MEMBERSHIP_PROMPT_CLASSNAME,
  FETCH_CONTENT_MESSAGE,
} from './constants';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App/App.jsx';

const floatingContentDivId = 'mediumUnlimited';
const floatingButtonParent = document.createElement('div');
floatingButtonParent.setAttribute('id', floatingContentDivId);
document.body.appendChild(floatingButtonParent);
let loaderElement;
function registerListeners() {
  _attachFloatingButton();
  setInterval(unlockIfHidden, 1500);
}

registerListeners();

function unlockIfHidden() {
  if (!hasMembershipPrompt(document)) {
    log('Content is open, nothing to do');
    return;
  }
  log('Content is hidden');
  _showLoader();
  window.location.reload();
  return;
  //Trying out a temporary solution before removing the old one.
  log('Sending message to fetch', document.location.href);
  chrome.runtime.sendMessage(
    {type: FETCH_CONTENT_MESSAGE, url: document.location.href},
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

function _setContent({content, hadMembershipPrompt, externalUrl}) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content.trim();
  const innerSection = document.getElementsByClassName(
    CONTENT_SECTION_CLASSNAME
  )[0];
  if (hadMembershipPrompt) {
    let messageContent;
    if (externalUrl) {
      messageContent = _getExternalLinkMessage(externalUrl);
    } else {
      messageContent = _getUnableToUnlockMessage();
    }
    tempDiv.firstChild.appendChild(messageContent);
  }
  innerSection.parentElement.replaceChild(tempDiv.firstChild, innerSection);
}

function _getExternalLinkMessage(externalUrl) {
  const domainName = new URL(externalUrl).hostname;
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="u-borderBox u-maxWidth700 u-marginAuto u-marginBottom40 u-marginTop40 u-padding30 u-flexTop u-borderRadius4 u-boxShadow2px10pxBlackLighter u-xs-hide u-backgroundNoRepeat">
      <img src="${chrome.extension.getURL('static/logo_128.png')}" class="u-width100 u-marginRight36">
      <div class="u-paddingTop25">
        <h1 class="ui-brand2 u-marginBottom30">External Publisher Article</h1>
        <p class="ui-body u-marginTop15 u-marginBottom30">This article's content couldn't be unlocked in here. But fortunately, you can follow the below link to read the full content.</p>
        <div class="buttonSet">
          <a href="${externalUrl}">
            <div class="button button--large button--withChrome u-baseColor--buttonNormal button--withIcon button--withSvgIcon button--withIconAndLabel u-boxShadow u-textAlignLeft u-marginBottom15 u-backgroundWhite u-textColorDarker u-sm-width220 u-sm-marginRight20 u-xs-marginRight0 u-paddingRight20 u-xs-marginBottom10">
              <span class="button-label  js-buttonLabel">Continue to ${domainName} for full content</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;
  return container;
}

function _getUnableToUnlockMessage() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="u-borderBox u-maxWidth700 u-marginAuto u-marginBottom40 u-marginTop40 u-padding30 u-flexTop u-borderRadius4 u-boxShadow2px10pxBlackLighter u-xs-hide u-backgroundNoRepeat">
      <img src="${chrome.extension.getURL('static/logo_128.png')}" class="u-width100 u-marginRight36">
      <div class="u-paddingTop25">
        <h1 class="ui-brand2 u-marginBottom30">Apologies 😔</h1>
        <p class="ui-body u-marginTop15 u-marginBottom30">Unfortunately, the contents of this article cannot be unlocked due to this publisher's medium settings.</p>
        <p class="ui-body u-marginTop15 u-marginBottom30">Please continue reading other articles.</p>
      </div>
    </div>
  `;
  return container;
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
  let membershipPromtElement = document.getElementsByClassName(
    MEMBERSHIP_PROMPT_CLASSNAME
  )[0];
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

