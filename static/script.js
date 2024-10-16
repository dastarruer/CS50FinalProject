const input = document.querySelector('input')

// Check if the user presses space, at which point we assume they have typed a word
input.addEventListener('keydown', (event) => {
    if (event.key == ' ') {
        // Clear the input field
        if (input.value != "") {
            input.value = "";
        }
        verifyWordTyped();
    }
})

function verifyWordTyped()
{
    console.log("Word typed");
}