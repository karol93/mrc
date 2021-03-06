import * as $ from 'jquery';

import { Filters } from './../shared/filters';
import { IScraper } from './scraper';
import { Utils } from '../shared/utils';

export class OlxScraper implements IScraper {

    private hostname: string;

    constructor() {
        this.hostname = "olx.pl";
    }

    async scrap(filters: Filters) {
        let rows = $(".fixed.offers.breakword tr.wrap");
        for (let htmlRow of rows) {
            const row = $(htmlRow);
            const detailsUrl = row.find('a.linkWithHash').attr('href');
            const priceCell = row.find('td.td-price');
            if (Utils.getHostnameFromUrl(detailsUrl) == this.hostname) {

                try {
                    const data = await $.get(detailsUrl);
                    const additionalPrice = $(data).find("th:contains('Czynsz')").next('td').text().replace('zł', '').replace(' ', '');
                    const originalPrice = $(data).find('div.price-label').text().replace('zł', '').replace(' ', '');
                    const sumPrice = Number(originalPrice) + Number(additionalPrice);

                    if (sumPrice > filters.priceFrom && sumPrice < filters.priceTo) {
                        priceCell.html('<div class="space inlblk rel"><p class="price"></p><div style="font-size: 25px;margin-bottom: 10px;padding:10px;box-shadow: 0 4px 25px rgba(0,0,0,0.19), 0 -1px 28px rgba(0,0,0,0.23)">Suma: <strong>' + sumPrice + ' zł</strong></div><div style="color:#af3c3c;"> Czynsz: ' + additionalPrice + ' zł</div><div> Oryginalna cena: ' + originalPrice + ' zł</div></div>');
                        row.css({ 'background-color': '#fff3f4', 'border': '2px solid #c06e74' })
                    }
                    else if (filters.hideNotMatched) {
                        row.remove();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            else if (filters.hideFromOutside) {
                row.remove();
            }
            else {
                priceCell.append('<div><strong style="color:#af3c3c;">OGŁOSZENIA SPOZA OLX</strong></div>');

            }
        }
    }

}