chrome.runtime.onInstalled.addListener(() => {
  chrome.history.search({text: '', maxResults: 10}, function(data) {
    const mostVisited = data.map(page => ({
      url: page.url,
      title: page.title
    }));
    chrome.storage.local.set({mostVisited});
  });
});