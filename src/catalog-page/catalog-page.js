import data from "./catalog-data.json"

export function catalogPage() {
    const el = document.createElement("div");

    const productCards = data.map(function (product) {
        const productCardEl = document.createElement("div");

        productCardEl.innerHTML = `<div class="product-card">
        <p class="product-card__title">${product.name}</p>
        <img class="product-card__img" src="${product.img}" />
        </div>`

        return productCardEl
    });

    el.innerHTML = `<div></div>`
    productCards.forEach(function(productCardEl){
        el.appendChild(productCardEl)
    })
    return el
}

catalogPage()