import * as $ from 'jquery';

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    $(".marginright5.link.linkWithHash.detailsLink, .marginright5.link.linkWithHash.detailsLinkPromoted").each(function () {
        var priceContainer = $(this).parent().parent().parent().next('td').find('p.price');
        var that = priceContainer.text().replace('zł','').replace(' ', '').trim();
        $.ajax({
            type: 'get', url: $(this).attr('href')
        }).done(function (data) {
            var additionalPrice = $(data).find("th:contains('Czynsz')").next('td').text().replace('zł','').replace(' ', '').trim();
            var result = Number(that) + Number(additionalPrice);
            var color = "";
            if(result < 2001){
                priceContainer.parent().parent().parent().parent().css({'background-color':'#00ffdc'})
            }
            $(priceContainer).html('<strong>'+ result+'</strong>')
        })
    })
    sendResponse(1);
});
