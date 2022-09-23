/**
 * Utility class for hidao80
 *
 * @class Utility
 */
export default class Utility {
    static selector(selector, parent = null) {
        if (parent) {
            parent.querySelector(selector);
        } else {
            return document.querySelector(selector);
        }
    }

    static selectorAll(selector, parent = null) {
        if (parent) {
            parent.querySelectorAll(selector);
        } else {
            return document.querySelectorAll(selector);
        }
    }

    static showMessage(message) {
        console.log(message);
        this.selector("[id=message][class=message]").innerHTML = message;
    }
}
