import { Filters } from './../shared/filters';
import { AvailableEndpoints } from './../config/config';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active && AvailableEndpoints.filter(p => tab.url.indexOf(p) > -1).length) {
        chrome.storage.sync.get(new Filters(), (filters: Filters) => {
            if (filters.activeFiltring) {
                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { filters: filters, url: tab.url })
                });
            }
        });
    }
})