import m17n from './Multilingualization.js';
import util from './Utility.js';

window.onload = async () => {
    m17n.translateAll();

    // Load and show target domain list
    const domainList = await chrome.storage.sync.get('domainList').then(item => item['domainList']);
    util.selector("textarea").value = domainList ?? 'https://misskey.dev';

    // Update each time you enter a domain list
    util.selector("textarea").addEventListener("input", e => {
        chrome.storage.sync.set({ 'domainList': e.target.value });
    });

    for (const elem of util.selectorAll("input[type=checkbox]")) {
        // Keep checked when previously checked
        const key = elem.id;
        const checked = await chrome.storage.sync.get(key).then(item => item[key]);

        if (checked) {
            elem.setAttribute('checked', checked);
        }

        // Keep track of the status of the checkbox each time it is clicked.
        elem.addEventListener("click", async (e) => {
            let object = {};
            const key = e.target.id;
            // console.log(e.target.checked);
            object[key] = e.target.checked ? true : false;

            chrome.storage.sync.set(object);
        });
    }

    util.selector('button').addEventListener('click', async (e) => {
        function reload() {
            window.location.reload(true);
        }
        const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: reload });
    });
}
