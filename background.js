function redirect(requestDetails) {
  function constructRedirectUrl(url, videoId) {
    return browser.storage.local.get(['url', 'port'])
      .then(items => {
        const instanceUrl = items.url || 'http://127.0.0.1';
        const instancePort = items.port || '8085';
        return `${instanceUrl}:${instancePort}/watch?v=${videoId}`;
      });
  }

  let url = requestDetails.url;

  // Handling YouTube short URLs
  if (url.includes("youtu.be")) {
    const videoId = url.split('/')[3].split('?')[0];
    return constructRedirectUrl(url, videoId).then(redirectUrl => {
      return { redirectUrl: redirectUrl };
    });
  }

  // Redirecting to Invidious for regular YouTube URLs
  if (url.includes("youtube.com")) {
    const videoId = new URL(url).searchParams.get("v");
    if (videoId) {
      return constructRedirectUrl(url, videoId).then(redirectUrl => {
        return { redirectUrl: redirectUrl };
      });
    }
  }
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ["*://*.youtube.com/*", "*://youtu.be/*"] },
  ["blocking"]
);

