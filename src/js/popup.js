const DEBUG = false;

import { $, syncGet } from "./lib/chromeExtUtils.js";
import { i18nInit } from "./lib/i18n.js";

window.onload = async () => {
    i18nInit();

    // Load and show target domain list
    const domainList = await syncGet('domainList');
    $("textarea").value = domainList || 'https://misskey.dev';

    // Update each time you enter a domain list
    $("textarea").addEventListener("input", e => {
        chrome.storage.sync.set({ 'domainList': e.target.value });
    });

    for (const elem of $("input[type=checkbox]")) {
        // Keep checked when previously checked
        const key = elem.id;
        const checked = await syncGet(key);

        if (checked) {
            elem.setAttribute('checked', checked);
        }

        // Keep track of the status of the checkbox each time it is clicked.
        elem.addEventListener("click", async (e) => {
            let object = {};
            const key = e.target.id;
            object[key] = e.target.checked ? true : false;

            chrome.storage.sync.set(object);
        });
    }
};
