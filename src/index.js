import "./style.css";

import { aboutUsPage } from "./about-us-page.js";
import { catalogPage } from "./catalog-page/catalog-page.js";
import { errorPage } from "./error-page.js";
import { layout } from "./layout.js";
import { router } from "./router.js";

document.addEventListener("DOMContentLoaded", function () {
    const rootElem = document.querySelector("#root");

    rootElem.appendChild(layout());

    router({
        routes: [
            {
                path: "/",
                component: catalogPage
            },
            {
                path: "/aboutUs",
                component: aboutUsPage
            }
        ],
        rootElementSelector: ".layout-child",
        errorPage: errorPage
    });
});
