const input = document.getElementById("inputfield");

let startTime = null;
let timerInterval = null;
let elapsedTime = null;
let isTyping = false;

let totalTypos = 0;

input.addEventListener("keydown", (event) => {
    // Check if the user presses space, at which point we assume they have typed a word
    if (event.key == " ") {
        const actualWordElement = document.getElementsByClassName("untyped")[0];
        const actualWord = actualWordElement.innerHTML;

        // If actualWordElement is null, then there are no more words to type
        if (actualWordElement === null) {
            clearInterval(timerInterval);
        }

        verifyWordTyped(input.value, actualWord);
        // Clear the input field
        if (input.value != "") {
            input.value = "";
        }
    }
});

input.addEventListener("input", () => {
    // If the user has not started typing
    if (!isTyping) {
        // Get the time when the user started typing
        startTime = new Date().getTime();

        // Start a timer 
        timerInterval = setInterval(() => {
            // Get the elapsed time in milliseconds
            elapsedTime = (new Date().getTime() - startTime) / 1000;
        }, 1000);
        isTyping = true;
    } else {
        console.log(elapsedTime);
    }
});

function verifyWordTyped(typedWord, actualWord) {
    let numOfTypos = Math.abs(typedWord.trim().localCompare(actualWord));

    if (numOfTypos === 0) {
        actualWordElement.className = "typed-correct";
    } else {
        actualWordElement.className = "typed-incorrect";
    }
    totalTypos += numOfTypos;
}