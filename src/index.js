import "./style.css";

import { aboutUsPage } from "./about-us-page.js";
import { dashboardPage } from "./dashboard-page/dashboard-page.js";
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
                component: dashboardPage
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
