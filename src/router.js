export const link = (options) => {
    const linkEl = document.createElement("a");
    linkEl.className = options.class ? options.class : "";
    linkEl.href = options.to ? options.to : "";
    linkEl.innerText = options.child;

    linkEl.addEventListener("click", (event) => {
        event.preventDefault();

        if (window.location.pathname !== options.to) {
            window.history.pushState(null, null, options.to);

            const popstate = new PopStateEvent("popstate");
            window.dispatchEvent(popstate);
        }
    });

    return linkEl;
}

export const router = function (options) {
    const { routes, rootElementSelector, errorPage } = options;

    const rootElements = document.querySelectorAll(rootElementSelector);

    if(rootElements.length === 0) {
         throw new Error("can't find root element for router");
    }

    if (rootElements.length > 1) {
        throw new Error("root element selector has to be unique for router");
    }

    const rootElement = rootElements[0];

    const loadPathname = window.location.pathname;

    const page = (routes.find(route => route.path === loadPathname) || {}).component;

        rootElement.innerHTML = "";

        if (!page) {
            if (errorPage) {
                rootElement.appendChild(errorPage());
            } else {
                rootElement.innerHTML = "404 page";
            }
        } else {
            rootElement.appendChild(page());
        }

    window.addEventListener("popstate", (event) => {
        const pathname = event.target.location.pathname;

        const page = (routes.find(route => route.path === pathname) || {}).component;

        rootElement.innerHTML = "";

        if (!page) {
            if (errorPage) {
                rootElement.appendChild(errorPage());
            } else {
                rootElement.innerHTML = "404 page";
            }
        } else {
            rootElement.appendChild(page());
        }
    });
}