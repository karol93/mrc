import { Filters } from './../shared/filters';
import { Utils } from './../shared/utils';
import { ScraperFactory } from './../scraper/scraper-factory';
import { IScraper } from '../scraper/scraper';

import 'babel-polyfill';


chrome.runtime.onMessage.addListener((msg, sender) => {
    let hostname : string = Utils.getHostnameFromUrl(msg.url);
    let filters : Filters = msg.filters;

    let scraper: IScraper = ScraperFactory.createScraper(hostname);

    scraper.scrap(filters);
});


