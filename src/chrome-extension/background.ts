import { Filters } from './../shared/filters';
import { AvailableEndpoints } from './../config/config';
import { Utils } from "../shared/utils";

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        var hostname = Utils.getHostnameFromUrl(tab.url);
        if (AvailableEndpoints.indexOf(hostname) > -1) {
            chrome.storage.sync.get(new Filters(), (filters: Filters) => {
                if (filters.activeFiltring) {
                    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                        chrome.tabs.sendMessage(tabs[0].id, { filters: filters, hostname: hostname }, (response) => {
                            console.log(response);
                        });
                    });
                }
            });
        }
    }
})