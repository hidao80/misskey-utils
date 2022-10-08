import { __ } from "./i18n.js";

/** var {int} LOG_MAX_LEN Maximum number of lines to be kept as a log. Lines older than this are discarded. */
export const LOG_MAX_LEN = 100;

/**
 * Alias for querySelector
 *
 * @param {string} selector css selector
 * @returns {Node} Node(s)
 */
export const $ = (selector) => {
    const nodes = document.querySelectorAll(selector);
    return nodes.length == 1 ? nodes[0] : nodes;
};

/**
 * String the current time
 *
 * @returns {string} "Y-m-d H-ii-s"
 */
export const getTodayString = () => {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    var yyyy = `000${year}`.slice(-4);
    var mm = `0${month}`.slice(-2);
    var dd = `0${day}`.slice(-2);
    return yyyy + "-" + mm + "-" + dd;
};

/**
 * Retrieve strings stored in storage (asynchronous)
 *
 * @param {string} key Object Keys
 * @returns {string} String stored in storage
 */
export const syncGet = async (key) => {
    const value = (await chrome.storage.sync.get(key))[key];
    return value ? value : __(key);
};

export const showMessage = (message) => {
    console.log(message);
    this.selector("[id=message][class=message]").innerHTML = message;
};

export const debug = (v) => { if (DEBUG) console.log(v); };
