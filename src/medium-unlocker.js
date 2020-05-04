import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App/App.jsx';

const floatingContentDivId = 'mediumUnlimited';
const floatingButtonParent = document.createElement('div');
floatingButtonParent.setAttribute('id', floatingContentDivId);
document.body.appendChild(floatingButtonParent);
function registerListeners() {
  _attachFloatingButton();
}

registerListeners();

function _attachFloatingButton() {
  ReactDOM.render(<App />, floatingButtonParent);
}

function _removeFloatingButton() {
  ReactDOM.unmountComponentAtNode(floatingButtonParent);
}