chrome.webRequest.onBeforeRequest.addListener(
  function (details) {
    return { redirectUrl: chrome.extension.getURL("js/core_fixA1.js") };
  },
  { urls: ["http://111.116.20.13/js/core.js", "http://*.ccut.cn/js/core.js", "http://*.ccut.edu.cn/js/core.js", "https://111-116-20-13.webvpn.ccut.cn/js/core.js"] },
  ["blocking"]
);