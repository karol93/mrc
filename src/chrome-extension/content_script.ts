import { Filters } from './../shared/filters';
import { ScraperFactory } from './../scraper/scraper-factory';
import { IScraper } from '../scraper/scraper';

import 'babel-polyfill';


chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  
    let hostname : string = msg.hostname;
    let filters : Filters = msg.filters;

    let scraper: IScraper = ScraperFactory.createScraper(hostname);

    scraper.scrap(filters);

    sendResponse(1);
});


