const DEBUG = false;

(async () => {
    const functionNames = ['TimeToAbsolute', 'NotesSpeech', 'FediverseTicker', 'KeywordsFilter', 'NotificationBeepInDeck'];

    // Dynamic import modules
    syncGet = (await import(chrome.runtime.getURL("js/lib/chromeExtUtils.js"))).syncGet;
    for (const name of functionNames) {
        window[name] = (await import(chrome.runtime.getURL("js/" + name + ".js"))).default;
    }

    // Load and show target domain list
    const domainList = await syncGet('domainList');
    const domainArray = domainList ? domainList.split("\n") : ["https://misskey.dev"];
    if (DEBUG) console.log(domainArray);

    // Do not run if you are on a page that is not in the target domain list.
    // console.log(document.domain);
    if (domainArray.filter(v => (new RegExp(document.domain)).test(v)).length > 0) {
        for (const name of functionNames) {
            if (await syncGet(name)) {
                // Call a function with the same name as the value of the checkbox id
                if (DEBUG) console.log(name);
                window[name]();
            }
        }
    }
})();
