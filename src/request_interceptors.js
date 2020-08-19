import {getTwitterReferer} from './utils';

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
  'https://blog.devartis.com/*',
  'https://blog.maddevs.io/*',
  'https://blog.getambassador.io/*',
  'https://uxplanet.org/*',
  'https://instagram-engineering.com/*',
  'https://calia.me/*',
  'https://productcoalition.com/*',
  'https://engineering.opsgenie.com/*',
  'https://android.jlelse.eu/*',
  'https://robinhood.engineering/*',
  'https://blog.hipolabs.com/*',
  'https://ux.shopify.com/*',
  'https://hackingandslacking.com/*',
];

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
