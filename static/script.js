import { timer } from "./timer.js";
import { verification } from "./verification.js";

let isTyping = false;
let wordIsStarted = true;

let totalNumOfTypos = 0;

let totalNumOfCharsTyped = 0;

const input = document.getElementById("inputfield");

// Used to trigger a timer when the user has started typing
input.addEventListener("input", () => {
    const currentWordElement = document.getElementsByClassName("untyped")[0];

    // If the user has started the test
    if (!isTyping) {
        // Start the timer
        timer.startTimer();
        isTyping = true;
    }

    // If the user has just started a word
    if (wordIsStarted && currentWordElement !== undefined) {
        currentWordElement.className = "current";

        wordIsStarted = false;
    }
});

// Used to process each word that the user types by checking for spacebar presses
input.addEventListener("keydown", (event) => {
    // Check if the user presses space, at which point we assume they have typed a word
    if (event.key == " ") {
        const actualWordElement = document.getElementsByClassName("current")[0];

        // If actualWordElement is null, then there are no more words to type
        if (actualWordElement === null) {
            timer.stopTimer();
        }
        processWord(actualWordElement, input);
        resetInputField();

        // Check if there are no other words after the one the user has typed
        if (document.getElementsByClassName("untyped")[0] === undefined) {
            stopTest();
        }
        wordIsStarted = true;
    }
});

function processWord(actualWordElement) {
    // Set the values of the verification object
    verification.actualWordElement = actualWordElement;
    verification.typedWord = input.value.trim();

    // Add one to the length of the typed word to include the space at the end
    totalNumOfCharsTyped += verification.typedWord.length + 1;

    let typosMade = verification.getTypos();

    totalNumOfTypos += typosMade;

    verification.verifyWordTyped(typosMade);
}

function resetInputField() {
    if (input.value != "") {
        input.value = "";
    }
}

function stopTest() {
    timer.stopTimer();

    // Show the user's words per minute on the page
    document.getElementById("wpm").innerHTML = `${getWPM()} WPM`;

    input.disabled = true;
}

function getWPM() {
    let wpm =
        (totalNumOfCharsTyped / 5 - totalNumOfTypos) / timer.elapsedTimeMinutes;
    if (wpm < 0) {
        wpm = 0;
    }
    return Math.round(wpm);
}
