const input = document.getElementById('inputfield')

// Check if the user presses space, at which point we assume they have typed a word
input.addEventListener('keydown', (event) => {
    if (event.key == ' ') {
        verifyWordTyped(input.value);
        // Clear the input field
        if (input.value != "") {
            input.value = "";
        }
    }
})

function verifyWordTyped(typedWord)
{
    let actualWordTag = document.getElementById('untyped')
    let actualWord = actualWordTag.innerHTML

    if (typedWord.trim() === actualWord)
    {
        actualWordTag.id = "typed-correct"
        console
    } 
    else {
        actualWordTag.id = "typed-incorrect"
    }
}