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
  'https://engineering.talkdesk.com/*',
  'https://blog.codegiant.io/*',
  'https://tech.olx.com/*',
  'https://netflixtechblog.com/*',
  'https://hackingandslacking.com/*',
  'https://blog.kotlin-academy.com/*',
  'https://blog.securityevaluators.com/*',
  'https://blog.kubernauts.io/*',
  'https://blog.coffeeapplied.com/*',
  'https://unbounded.io/*',
  'https://writingcooperative.com/*',
  'https://*.plainenglish.io/*',
  'https://*.betterprogramming.pub/*',
  'https://blog.doit-intl.com/*',
  'https://eand.co/*',
  'https://techuisite.com/*',
  'https://levelupprogramming.net/*',
  'https://betterhumans.pub/*',
  'https://betterprogramming.pub/*',
  'https://pub.towardsai.net/*',
  'https://bettermarketing.pub/*',
  'https://themakingofamillionaire.com/*',
  'https://medium.datadriveninvestor.com/*',
  'https://bootcamp.uxdesign.cc/*',
  'https://*.baos.pub/*',
  'https://www.inbitcoinwetrust.net/*',
  'https://blog.prototypr.io/*',
  'https://blog.devgenius.io/*'
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
    if (
      chrome.webRequest.OnBeforeSendHeadersOptions.hasOwnProperty(
        'EXTRA_HEADERS'
      )
    ) {
      extraInfoSpec.push('extraHeaders');
    }
    return extraInfoSpec;
  }

  function removeHeader(headers, headerToRemove) {
    return headers.filter(({name}) => name.toLowerCase() != headerToRemove);
  }

  function addHeader(headers, name, value) {
    headers.push({name, value});
    return headers;
  }
}
