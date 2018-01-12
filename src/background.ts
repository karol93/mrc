import { IScraper } from './scraper';
import { Utils } from "./utils";
import { Filters } from "./filters";
import { AvailableHost } from './config';
import { OlxScraper } from './olx-scraper';
import { OtodomScraper } from './otodom-scraper';

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete' && tab.active) {
        var hostname = Utils.getHostnameFromUrl(tab.url);
        if (AvailableHost.indexOf(hostname) > -1) {
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