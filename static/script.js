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
    let actualWord = document.getElementById('untyped').innerHTML

    if (typedWord === actualWord)
    {
        console.log("correct!")
    } 
    else {
        console.log("incorrect...")
    }
}