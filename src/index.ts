import { Filters } from './filters';
import * as $ from 'jquery';

$('#save').click(saveFilters);

chrome.tabs.query({}, () => loadFilters());

function saveFilters(e: any) {
    e.preventDefault();
    let filters = new Filters();
    filters.hideNotMatched = $("#hide-not-matched").prop('checked');
    filters.activeFiltring = $("#active-filtring").prop('checked');
    filters.hideFromOutside = $("#hide-from-outside").prop('checked');
    filters.priceTo = Number($("#price-to").val());
    filters.priceFrom = Number($("#price-from").val());
    chrome.storage.sync.set(filters, () => {
        $(".alert").fadeToggle("slow", "linear")
        setTimeout(() => {
            $(".alert").fadeToggle("slow", "linear")
        }, 2000);
    });
}

function loadFilters() {
    chrome.storage.sync.get(new Filters(), (filters: Filters) => {

        $("#active-filtring").prop('checked', filters.activeFiltring);
        $("#hide-not-matched").prop('checked', filters.hideNotMatched);
        $("#hide-from-outside").prop('checked', filters.hideFromOutside);
    });
}

$(".times").click(() => $(".alert").fadeToggle("slow", "linear"))