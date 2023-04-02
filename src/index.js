import {router} from "./router.js";

document.addEventListener("DOMContentLoaded", function () {
    const rootElem = document.querySelector("#app");

    const link = document.createElement("a");
    link.setAttribute("href", "#/product");
    link.textContent = "#/product";

    link.addEventListener("click", function (event) {
        console.log(router);
    });

    rootElem.appendChild(link);
});
