chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        var hostname = (new URL(tab.url)).hostname
        if (hostname == "www.olx.pl" || hostname == "olx.pl") {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
                  console.log(response);
                });
              });
        }
    }
})