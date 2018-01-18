import { OtodomScraper } from './otodom-scraper';
import { OlxScraper } from './olx-scraper';
import { IScraper } from './scraper';
import { Filters } from './filters';

import 'babel-polyfill';
import { ScraperFactory } from './scraper-factory';


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  
    let hostname : string = msg.hostname;
    let filters : Filters = msg.filters;

    let scraper: IScraper = ScraperFactory.createScraper(hostname);

    scraper.scrap(filters);

    sendResponse(1);
});


