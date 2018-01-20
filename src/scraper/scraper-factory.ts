import { OtodomScraper } from './otodom-scraper';
import { IScraper } from './scraper';
import { OlxScraper } from './olx-scraper';
export class ScraperFactory{
    public static createScraper(type: string) : IScraper {

        if (type === "olx.pl") {
            return new OlxScraper();
        } else if (type === "otodom.pl") {
            return new OtodomScraper();
        }

        throw new Error("Argument Exception");
    }
}