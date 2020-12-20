import {getTwitterReferer} from './utils';
import urlsList from './urls';

export default function intercept() {
  function onBeforeSendHeaders(details) {
    if (details.requestHeaders) {
      let newHeaders = removeHeader(details.requestHeaders, 'referer');
      newHeaders = addHeader(newHeaders, 'Referer', getTwitterReferer());

      return {requestHeaders: newHeaders};
    }
    return {requestHeaders: details.requestHeaders};
  }

  chrome.webRequest.onBeforeSendHeaders.addListener(
    onBeforeSendHeaders,
    {
      urls: urlsList,
    },
    getBeforeSendExtraInfoSpec()
  );

  function getBeforeSendExtraInfoSpec() {
    const extraInfoSpec = ['blocking', 'requestHeaders'];
    if (chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty('EXTRA_HEADERS')) {
      extraInfoSpec.push('extraHeaders');
    }
    return extraInfoSpec
  }

  function removeHeader(headers, headerToRemove) {
    return headers.filter(({name}) => name.toLowerCase() != headerToRemove);
  }

  function addHeader(headers, name, value) {
   headers.push({name, value});
    return headers;
  }
}
