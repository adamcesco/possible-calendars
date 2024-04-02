/* global chrome */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scrape') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'scrape' }, (response) => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            sendResponse({ error: 'Failed to send message to content script' });
          } else {
            sendResponse(response);
          }
        });
      } else {
        sendResponse({ error: 'No active tab found' });
      }
    });
    return true; // Required to use sendResponse asynchronously
  }
});