/**
 * Filter out offensive words.
 */
function KeywordsFilter() {
    const FILTERED_WORDS = "■■■";

    const KEYWORDS = [
        // User defined keywords

        // Default keywords
        "馬鹿",
        "バカ",
        "ﾊﾞｶ",
        "うんこ",
        "ウンコ",
        "ｳﾝｺ",
        "くそ",
        "クソ",
        "ｸｿ",
        "fuck",
        "f*ck",
        "fu*k",
        "f**k",
        "shit",
        "sh*t",
        "s*it",
        "s**t",
    ];

    /**
     * Replace all keywords
     * @param {string} text target string
     * @return {string} replaced text
     */
    function replace(text) {
        for (const word of KEYWORDS) {
            text = text.replaceAll(word, FILTERED_WORDS);
        }
        return text;
    }

    // Style is a later winner, so send and add
    const timer = setInterval(() => {
        // Designation of lanes to watch for posts
        var parentElment = [...document.querySelectorAll(".header")].find(
            v => /ソーシャル/.test(v.textContent)
        )?.parentElement.parentElement;

        if (parentElment) {
            clearInterval(timer);

            // Filter out offensive remarks on social networking sites.
            function filter() {
                // MFM takes a while to draw, so wait a bit.
                setTimeout(() => {
                    for (const elem of parentElment.querySelectorAll(".text>.havbbuyv,.cw>.havbbuyv")) {
                        // Displayed text
                        elem.innerHTML = replace(elem.innerHTML);

                        // Text not shown (used by MisskeyNotesSpeech)
                        elem.setAttribute("text", replace(elem.getAttribute("text")));
                    }
                }, 100);
            }

            // Call the read function when a post is added.
            const targetLane = parentElment.querySelector(".transition.notes") ?? parentElment.querySelector(".transition");
            (new MutationObserver(filter)).observe(targetLane, { childList: true });
        }
    }, 300);
}