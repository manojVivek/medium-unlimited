import intercept from './cookie_interceptors'; //Importing just to make sure the interceptors are registered.
import {log} from './utils';

const inProgressUrls = {};

intercept(inProgressUrls);

chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  log('Fetching content for', request.url);
  inProgressUrls[request.url] = true;
  _fetch(request.url)
    .then(responseData => {
      const content = extractArticleContent(responseData);
      sendResponse({status: 'SUCCESS', content});
      delete inProgressUrls[request.url];
    })
    .catch(error => {
      sendResponse({status: 'ERROR', error: JSON.stringify(error)});
      delete inProgressUrls[request.url];
    });
  return true;
});

function extractArticleContent(responseData) {
  const doc = document.createElement('html');
  doc.innerHTML = responseData.body;
  const content = document.createElement('div');
  Array.from(doc.getElementsByClassName('section-content')).forEach(e =>
    content.appendChild(e)
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
