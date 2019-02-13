'use strict';
$(function () {
    let insertTarget = ["#sale", "#promo", "#recommended"];
    $.getJSON("products.json", (data) => {
        console.log(data);
        let sortedData = [
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

        let tmpl = $("#productTemplate")[0].innerHTML;
        console.log("tmpl", tmpl);
        tmpl = _.template(tmpl);

        sortedData.forEach( (productType, i) => {
            let target = $(insertTarget[i]);
            let insertText = tmpl({
                title: productType.title,
                products: productType.products
            });
            target.append(insertText);
            console.log(target);
            console.log(insertText);
            console.log(tmpl({
                title: productType.title,
                products: productType.products
            }));
        });
        console.log("end");


    })


});
