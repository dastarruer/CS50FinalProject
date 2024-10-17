const input = document.getElementById("inputfield");

let startTime = null;
let timerInterval = null;
let elapsedTime = null;
let isTyping = false;

input.addEventListener("keydown", (event) => {
    // Check if the user presses space, at which point we assume they have typed a word
    if (event.key == " ") {
        verifyWordTyped(input.value)
        // Clear the input field
        if (input.value != "") {
            input.value = ""
        }
    }
})


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
        console.log(elapsedTime)
    }
});


function verifyWordTyped(typedWord) {
    const actualWordElement = document.getElementsByClassName("untyped")[0]
    const actualWord = actualWordElement.innerHTML

    if (typedWord.trim() === actualWord) {
        actualWordElement.className = "typed-correct"
    }
    else {
        actualWordElement.className = "typed-incorrect"
    }
}