import { timer } from "./timer.js";
import { verification } from "./verification.js";

const input = document.getElementById("inputfield");

let isTyping = false;

let totalNumOfTypos = 0;

let totalNumOfCharsTyped = 0;

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

        // Add one to the length of the typed wrod to include the space at the end
        totalNumOfCharsTyped += verification.typedWord.length + 1;

        let typosMade = verification.getTypos();

        totalNumOfTypos += typosMade;

        verification.verifyWordTyped(typosMade);

        if (input.value != "") {
            input.value = "";
        }

        // Check if there are no other words after the one the user has typed
        if (document.getElementsByClassName("untyped")[0] === undefined) {
            timer.stopTimer();

            // Show the user's words per minute on the page
            document.getElementById("wpm").innerHTML = `${getWPM()}WPM`;
        }
    }
});

function getWPM() {
    let wpm =
        (totalNumOfCharsTyped / 5 - totalNumOfTypos) / timer.elapsedTimeMinutes;
    // Return wpm rounded to two digits
    return Math.round(wpm * 100) / 100;
}
