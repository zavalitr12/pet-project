import { link } from "./router";

export function layout() {
    const el = document.createElement("div");
    el.className = "layout";

    const header = document.createElement("header");
    header.appendChild(link({
        class: "headerLink",
        to: "/",
        child: "Главная"
    }));
    header.appendChild(link({
        class: "headerLink",
        to: "/aboutUs",
        child: "О нас"
    }));

    const page = document.createElement("div");
    page.className = "layout-child";

    el.append(header);
    el.append(page);

    return el;
}