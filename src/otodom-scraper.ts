import { Filters } from './filters';
import { Utils } from './utils';
import { IScraper } from './scraper';

import * as $ from 'jquery';

export class OtodomScraper implements IScraper {

    private hostname: string;

    constructor() {
        this.hostname = "otodom.pl";
    }

    async scrap(filters: Filters) {
        const rows = $(".col-md-content .offer-item-details");
        for (let htmlRow of rows) {
            const row = $(htmlRow);
            const detailsUrl = row.find('a').attr('href');
            const priceCell = row.find('.offer-item-price');
            if (Utils.getHostnameFromUrl(detailsUrl) == this.hostname) {

                try {
                    const data = await $.get(detailsUrl);
                    const additionalPrice = $(data).find("strong:contains('Czynsz - dodatkowo:')").parent().contents().eq(1).text().replace('zł', '').replace(' ', '');
                    if (!$.isNumeric(additionalPrice)) {
                        priceCell.append('<div>brak informacji o czynszu</div>');
                        return;
                    }

                    const originalPrice = $(data).find('ul.main-list li:eq(0)').find('span').text().replace('zł', '').replace(' ', '');
                    const sumPrice = Number(originalPrice) + Number(additionalPrice);
                    if (sumPrice > filters.priceFrom && sumPrice < filters.priceTo) {
                        priceCell.html(sumPrice.toString());
                    }
                    else if (filters.hideNotMatched) {
                        row.parent().remove();
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
            else if (filters.hideFromOutside) {
                row.parent().remove();
            }
            else {
                priceCell.append('<div><strong style="color:#af3c3c;">OGŁOSZENIA SPOZA OTODOM</strong></div>');
            }
        }
    }
}