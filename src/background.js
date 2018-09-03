import intercept from './cookie_interceptors'; //Importing just to make sure the interceptors are registered.
import {log} from './utils';
import {track} from './analytics';

const inProgressUrls = {};

intercept(inProgressUrls);

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  log('Fetching content for', request.url);
  inProgressUrls[request.url] = true;
  track('REQUESTED');
  _fetch(request.url)
    .then(responseData => {
      const content = extractArticleContent(responseData);
      sendResponse({status: 'SUCCESS', content});
      track('SUCCESS');
      delete inProgressUrls[request.url];
    })
    .catch(error => {
      sendResponse({status: 'ERROR', error: JSON.stringify(error)});
      track('FAILED');
      delete inProgressUrls[request.url];
    });
  return true;
});

function extractArticleContent(responseData) {
  const doc = document.createElement('html');
  doc.innerHTML = responseData.body;
  const content = Array.from(
    doc.getElementsByClassName('section-content')
  ).reduce(
    (accumulator, section) => accumulator.appendChild(section),
    document.createElement('div')
  );
  return new XMLSerializer().serializeToString(content);
}

function _fetch(url) {
  return fetch(url, {credentials: 'include'}).then(response => {
    return response.text().then(body => {
      return {status: response.status, body};
    });
  });
}
