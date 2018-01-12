import { OtodomScraper } from './otodom-scraper';
import { OlxScraper } from './olx-scraper';
import { IScraper } from './scraper';
import { Filters } from './filters';

import 'babel-polyfill';


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    let scraper: IScraper;
    let hostname : string = msg.hostname;
    let filters : Filters = msg.filters;

    if (hostname == "olx.pl")
        scraper = new OlxScraper();
    else if (hostname  == "otodom.pl")
        scraper = new OtodomScraper();

    scraper.scrap(filters);

    sendResponse(1);
});


