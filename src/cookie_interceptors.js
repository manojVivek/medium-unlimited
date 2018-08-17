export default function intercept(inProgressUrls) {
  function onBeforeSendHeaders(details) {
    if (details.requestHeaders && inProgressUrls[details.url]) {
      const newHeaders = removeHeader(details.requestHeaders, 'cookie');
      return {requestHeaders: newHeaders};
    }
    return {requestHeaders: details.requestHeaders};
  }

  chrome.webRequest.onBeforeSendHeaders.addListener(
    onBeforeSendHeaders,
    {
      urls: ['https://medium.com/*'],
    },
    ['requestHeaders', 'blocking']
  );

  function onHeadersReceived(details) {
    if (details.responseHeaders && inProgressUrls[details.url]) {
      const newHeaders = removeHeader(details.responseHeaders, 'set-cookie');
      return {responseHeaders: newHeaders};
    }
    return {responseHeaders: details.responseHeaders};
  }

  chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceived,
    {
      urls: ['https://medium.com/*'],
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
}
