(async () => {
    // Load and show target domain list
    const domainList = await chrome.storage.sync.get('domainList').then(item => item['domainList']) ?? "https://misskey.dev";
    const domainArray = domainList.split("\n");

    // Do not run if you are on a page that is not in the target domain list.
    // console.log(document.domain);
    if (domainArray.filter(v => (new RegExp(document.domain)).test(v)).length) {
        const functionNames = ['TimeToAbsolute', 'NotesSpeech', 'FediverseTicker', 'KeywordsFilter', 'NotificationBeep'];
        for (const name of functionNames) {
            if (await chrome.storage.sync.get(name).then(item => item[name])) {
                // Call a function with the same name as the value of the checkbox id
                window[name]();
            }
        }
    }
})();
