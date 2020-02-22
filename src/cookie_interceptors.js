import {urlWithoutQueryParams, getTwitterReferer} from './utils';

const urlsList = [
  'https://medium.com/*',
  'https://www.google.com/search/*',
  'https://towardsdatascience.com/*',
  'https://hackernoon.com/*',
  'https://medium.freecodecamp.org/*',
  'https://psiloveyou.xyz/*',
  'https://betterhumans.coach.me/*',
  'https://codeburst.io/*',
  'https://theascent.pub/*',
  'https://*.medium.com/*',
  'https://medium.mybridge.co/*',
  'https://uxdesign.cc/*',
  'https://levelup.gitconnected.com/*',
  'https://itnext.io/*',
  'https://entrepreneurshandbook.co/*',
  'https://proandroiddev.com/*',
  'https://blog.prototypr.io/*',
  'https://thebolditalic.com/*',
  'https://blog.usejournal.com/*',
  'https://blog.angularindepth.com/*',
  'https://blog.bitsrc.io/*',
  'https://uxplanet.org/*',
  'https://instagram-engineering.com/*',
  'https://calia.me/*',
  'https://productcoalition.com/*',
  'https://engineering.opsgenie.com/*',
  'https://android.jlelse.eu/*',
];

export default function intercept(inProgressUrls) {
  function onBeforeSendHeaders(details) {
    if (details.requestHeaders /*&& shouldIntercept(details)*/) {
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
    getHeadersReceivedExtraInfoSpec()
  );

  function getHeadersReceivedExtraInfoSpec() {
    const extraInfoSpec = ['blocking', 'responseHeaders'];
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

  function shouldIntercept(details) {
    return (
      inProgressUrls[urlWithoutQueryParams(details.url)] ||
      details.url.startsWith(
        'https://medium.com/m/global-identity?redirectUrl='
      )
    );
  }
}
