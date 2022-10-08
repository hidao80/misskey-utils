/**
 * UserScript to add absolute notation to Fediverse's posting time.
 */
export default function TimeToAbsolute() {
    const styles = [
        // not post-column
        `article time::before {
            content: attr(title) " (";
        }`,
        `article time::after {
            content: ")";
        }`,

        // for Mastodon
        `article .status__info {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row-reverse;
        }`,
        `article .status__info .status__display-name {
            margin-right: auto;
            padding-right: 0;
        }`,

        // posted-column in Misskey
        `.transition time::before {
            content: attr(title) " (";
        }`,
        `.transition time::after {
            content: ")";
        }`,
        `.transition header.header {
            flex-wrap: wrap
        }`,
        `.transition header.header>.name {
            display: block;
        }`,
        `.transition header.header>.username {
            display: block;
        }`,
        `.transition .info {
            display: block;
            text-align: right;
            margin-left: auto;
        }`,
        `.transition .info>a, .transition .info>span {
            display: inline-block;
        }`,

        // notification column for home layout in Misskey
        `.mk-notifications>.notifications>div>.notification>.text>header[data-v-b78fea54] {
            flex-wrap: wrap
        }`,
        `.notification header time {
            display: block;
            text-align: right;
            margin-left: auto;
        }`,

        // notification column for deck layout in Misskey
        `.dsfykdcjpuwfvpefwufddclpjhzktmpw>.notification>div>header[data-v-bb2367fa] {
            flex-wrap: wrap
        }`,
        `.notification .header .info {
            display: block;
            text-align: right;
            margin-left: auto;
        }`,
    ];

    // Style is a later winner, so send and add
    setTimeout(() => {
        for (let style of styles) {
            document.styleSheets[0].insertRule(style);
        }
    }, 500);
}
