import { __ } from "./lib/i18n.js";

/**
 * UserScript to read out Misskey's social timeline using the Speech API.
 */
export default function NotesSpeech() {
    // Initialization of reading voice
    const synth = window.speechSynthesis;
    const WIN = "Kyoko";
    const EDGE = "Nanami";
    const GOOGLE_JAPANIESE = "Google 日本語";
    const ENGLISH = "Aria";
    const lang = chrome.i18n.getUILanguage().substring(0, 2);
    const getVoice = (n) => synth.getVoices().find((v) => v.name.indexOf(n) >= 0);
    const utter = new SpeechSynthesisUtterance();
    // utterrate = 1;
    // uttervolume = 20;

    // Voice tones are given priority to those found from left to right.
    const setVoice = () => {
        if (lang == "ja") {
            utter.voice = getVoice(EDGE) || getVoice(GOOGLE_JAPANIESE) || getVoice(WIN) || getVoice(ENGLISH);
        } else {
            utter.voice = getVoice(ENGLISH);
        }
    };

    // When a voice color object is loaded, the voice color is set to "Nanami" for Edge.
    synth.onvoiceschanged = setVoice;

    const timer = setInterval(v => {
        // Designation of lanes to watch for posts
        const regExp = new RegExp(__('Read_out_timeline'));
        var parentElment = [...document.querySelectorAll(".header")].find(
            v => regExp.test(v.textContent)
        )?.parentElement.parentElement;

        if (parentElment) {
            clearInterval(timer);
            setVoice();

            // Trimming the readout
            function speech() {
                // I'm reading it out now, and I'm going to stop in the middle.
                synth.cancel();

                // Nickname cutout
                utter.text = parentElment.querySelector(".havbbuyv.nowrap").textContent + __("their_note");

                // Notebook cutout (excluding CW)
                utter.text += parentElment.querySelector(".text>.havbbuyv").getAttribute("text")
                    .replace(/\n/g, '。')
                    .replace(/。+/g, '。')
                    .replace(/https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g, ' ');

                // Reading out notes
                synth.speak(utter);
            }

            // Call the read function when a post is added.
            const targetLane = parentElment.querySelector(".transition.notes") ?? parentElment.querySelector(".transition");
            (new MutationObserver(speech)).observe(targetLane, { childList: true });
        }
    }, 500);
}
