import {urlWithoutQueryParams} from './utils';

const urlsList = [
  'https://medium.com/*',
  'https://towardsdatascience.com/*',
  'https://hackernoon.com/*',
  'https://medium.freecodecamp.org/*',
];

export default function intercept(inProgressUrls) {
  function onBeforeSendHeaders(details) {
    if (details.requestHeaders && shouldIntercept(details)) {
      const newHeaders = removeHeader(details.requestHeaders, 'cookie');
      return {requestHeaders: newHeaders};
    }
    return {requestHeaders: details.requestHeaders};
  }

  chrome.webRequest.onBeforeSendHeaders.addListener(
    onBeforeSendHeaders,
    {
      urls: urlsList,
    },
    ['requestHeaders', 'blocking']
  );

  function onHeadersReceived(details) {
    if (details.responseHeaders && shouldIntercept(details)) {
      const newHeaders = removeHeader(details.responseHeaders, 'set-cookie');
      return {responseHeaders: newHeaders};
    }
    return {responseHeaders: details.responseHeaders};
  }

  chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceived,
    {
      urls: urlsList,
    },
    ['responseHeaders', 'blocking']
  );

  function removeHeader(headers, headerToRemove) {
    const newHeaders = [];
    headers.forEach(({name, value}) => {
      if (name.toLowerCase() === headerToRemove) {
        return;
      }
      return newHeaders.push({name, value});
    });
    return newHeaders;
  }

  function shouldIntercept(details) {
    return (
      inProgressUrls[urlWithoutQueryParams(details.url)] ||
      details.url.startsWith(
        'https://medium.com/m/global-identity?redirectUrl='
      )
    );
  }
}
