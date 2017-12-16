import * as $ from 'jquery';


$('#save').click(saveFilters);

chrome.tabs.query({}, () => loadFilters());

function saveFilters(e: any) {
    e.preventDefault();
    let priceFrom = $("#price-from").val();
    let priceTo = $("#price-to").val();
    let hideNotMatched = $("#hide-not-matched").prop('checked');
    chrome.storage.sync.set({
        priceFrom: priceFrom,
        priceTo: priceTo,
        hideNotMatched: hideNotMatched
    }, () => { alert('saved!') });
}

function loadFilters() {
    chrome.storage.sync.get({
        priceFrom: 1,
        priceTo: 1000,
        hideNotMatched: true
    }, (filters: { priceFrom, priceTo, hideNotMatched }) => {
        console.log(filters);
        $("#price-from").val(filters.priceFrom);
        $("#price-to").val(filters.priceTo);
        $("#hide-not-matched").prop('checked', filters.hideNotMatched);
    });
}