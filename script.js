'use strict';
$(function () {
    let insertTarget = ["#sale", "#promo", "#recommended"];
    $.fancybox.showLoading();
    $.getJSON("products.json", (data) => {
        sleep(3000);
        let sortedData = createData(data);
        let tmpl = createTemplate("#productTemplate");
        sortedData.forEach( (productType, i) => {
            let target = $(insertTarget[i]);
            let insertText = tmpl({
                title: productType.title,
                products: productType.products
            });
            target.append(insertText);
        });
        $.fancybox.hideLoading();
    })
        .fail(function() {
        console.log( "error" );
    })


});


/**
 * @param data = JSON
 */
function createData(data){
    return [
        {
            title: "Распродажа",
            type: "sale",
            products: data.filter(item => item.type === "sale")
        },
        {
            title: "Промо-акция",
            type: "promo",
            products: data.filter(item => item.type === "promo")
        },
        {
            title: "Рекомендованные товары",
            type: "recommended",
            products: data.filter(item => item.type === "recommended")
        }];
}

/**
 * @param id = ID_элемента-шаблона
 * */
function createTemplate(id){
    let tmpl = $(id)[0].innerHTML;
    return _.template(tmpl);
}


function sleep(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
}
