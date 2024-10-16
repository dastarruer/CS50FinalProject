import { timer } from "./timer.js";
import { verification } from "./verification.js";

const input = document.getElementById("inputfield");

let isTyping = false;

let totalTypos = 0;

let numOfWords = document.getElementsByClassName("untyped").length;

// Used to trigger a timer when the user has started typing
input.addEventListener("input", () => {
    // If the user has not started typing
    if (!isTyping) {
        // Start the timer
        timer.startTimer();
        isTyping = true;
    }
});

// Used to process each word that the user types by checking for spacebar presses
input.addEventListener("keydown", (event) => {
    // Check if the user presses space, at which point we assume they have typed a word
    if (event.key == " ") {
        const actualWordElement = document.getElementsByClassName("untyped")[0];

        // If actualWordElement is null, then there are no more words to type
        if (actualWordElement === null) {
            timer.stopTimer();
        }
        // Set the values of the verification object
        verification.actualWordElement = actualWordElement;
        verification.typedWord = input.value.trim();

        let typosMade = verification.getTypos();

        // Add the typos made to the total number of typos
        totalTypos += typosMade;

        // Verify the word typed
        verification.verifyWordTyped(typosMade);

        // Clear the input field
        if (input.value != "") {
            input.value = "";
        }

        // Check if there are no other words after the one the user has typed
        // if (document.getElementsByClassName("untyped")[0] === null) {
        //     getWPM()
        // }
    }
});

// function getWPM() {
//     return (numOfWords / 5 - totalTypos) / timer.elapsedTimeMinutes;
// }
