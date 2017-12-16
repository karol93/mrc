import { Filters } from './filters';
import * as $ from 'jquery';

$('#save').click(saveFilters);

chrome.tabs.query({}, () => loadFilters());

function saveFilters(e: any) {
    e.preventDefault();
    let filters = new Filters();
    filters.hideNotMatched = $("#hide-not-matched").prop('checked');
    filters.priceTo = Number($("#price-to").val());
    filters.priceFrom = Number($("#price-from").val());
    chrome.storage.sync.set(filters, () => { alert('saved!') });
}

function loadFilters() {
    chrome.storage.sync.get({
        priceFrom: 1,
        priceTo: 1000,
        hideNotMatched: true
    }, (filters: Filters) => {
        $("#price-from").val(filters.priceFrom);
        $("#price-to").val(filters.priceTo);
        $("#hide-not-matched").prop('checked', filters.hideNotMatched);
    });
}