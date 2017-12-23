import { Utils } from "./utils";
import { Filters } from "./filters";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        var hostname = Utils.getHostnameFromUrl(tab.url);
        if (hostname == "olx.pl") {
            chrome.storage.sync.get(new Filters(), (filters: Filters) => {
                if (filters.activeFiltring) {
                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        chrome.tabs.sendMessage(tabs[0].id, { hostname: hostname, filters: filters }, (response) => {
                            console.log(response);
                        });
                    });
                }
            });
        }
    }
})