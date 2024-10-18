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

        // If actualWordElement is null, then there are no more words to type
        if (actualWordElement === null) {
            clearInterval(timerInterval);
        }

        verifyWordTyped(input.value, actualWordElement);
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
    }
});

// Get the number of typos between the typed word and the actual word
function getTypos(typedWord, actualWord) {
    
    let numOfTypos = 0;

    len = typedWord.length;
    for (let i = 0; i < len; i++) {
        typedChar = typedWord[i];
        actualChar = actualWord[i];
        
        if (typedChar !== actualChar) {
            numOfTypos++;
        }
        else if (actualChar === null) {
            // If actualChar is null, that means that the typedWord is longer than actualWord
            numOfTypos += typedWord.length - actualWord.length;
            break;
        }
    }
    return numOfTypos;
}

function verifyWordTyped(typedWord, actualWordElement) {
    const actualWord = actualWordElement.innerHTML

    typedWord = typedWord.trim()
    let numOfTypos = getTypos(typedWord, actualWord);

    if (numOfTypos === 0) {
        actualWordElement.className = "typed-correct";
    } else {
        actualWordElement.className = "typed-incorrect";
    }
    totalTypos += numOfTypos;
    console.log(totalTypos);
}