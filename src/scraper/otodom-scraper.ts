import * as $ from 'jquery';
import { Filters } from './../shared/filters';
import { Utils } from '../shared/utils';
import { IScraper } from './scraper';


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
                        priceCell.css({ 'color': '#bebebe', 'font-size': '12px', "text-align": "right" })
                        priceCell.append('<div style="font-size: 18px;color: #ff7200;">brak informacji o czynszu</div>');
                        continue; 
                    } 

                    const originalPrice = $(data).find('ul.main-list li:eq(0)').find('span').text().replace('zł', '').replace(' ', '');
                    const sumPrice = Number(originalPrice) + Number(additionalPrice);
                    if (sumPrice > filters.priceFrom && sumPrice < filters.priceTo) {
                        row.parent().css({'border':'4px solid #13ba58','background':'#13ba580d'})
                        priceCell.html(`<div style="text-align: right"><div style="">Suma: ${sumPrice.toString()} zł</div><div style="margin-top: 4px;color: #13ba58;font-size: 13px;">Czynsz: ${additionalPrice} zł</div><div style="font-size: 13px;">Oryginalna cena: ${originalPrice} zł</div></div>`);
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
                priceCell.append('<div ><strong style="color:#af3c3c;">OGŁOSZENIA SPOZA OTODOM</strong></div>');
            }
        }
    }
}