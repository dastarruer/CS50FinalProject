# TypeSpeed
## Video Demo:
## Description
TypeSpeed is a typing test. It gives the user a random set of words under 3 syllables to type. Once the user has finished typing them, they recieve their WPM, at which point they are promtped to try again.   
This project utilizes `HTML`, `CSS`, `JavaScript`, and `Flask`. 
## Files
### `words.txt.`
This `.txt` file is where all the possible words that the user can get are stored. There are one hundred possible words that are all under three syllables. The reason I chose this length was because I believed that it would allow the user to type faster, instead of being stuck on words that are too long. 
### `app.py`
This file is used as the backend of the project. It is used to generate the words that the user should type. These words are all taken from `words.txt`:  
```
with open("words.txt", 'r') as file:
    words = file.readlines()
```
and are then randomly sampled and stripped of their whitespace:
```
numOfWords = 30
...
words = sample(words, numOfWords)
words = [word.strip() for word in words]
```
I was also debating the idea of removing all duplicates in `words`, but I decided that it would be unnecessary, as the user probably wouldn't care if they were given multiple of the same word.  
`words` is then sent off to `index.html` to display for the user:
```
return render_template("index.html", words=words)
```
### `templates/layout.html`
This is the 'skeleton' of all the other `HTML` pages in this project. It is designed to be easily extensible, so that if I were to add other pages to it, this layout would be preserved across pages.  
The only thing of note is the logo, which I decided should be visible on every page:
```
<h2 id="logo">TypeSpeed</h2>
```
While at first, I thought that it should be on `templates/index.html`, I decided against it, as if I were to extend the website's functionality, a logo should be visible on every page rather than just the main one.  
### `templates/index.html`
This is the main page of the website. This is where the user is intended to do the typing tests -- the main functionality of this website.  
The first element is made to show the user their WPM after they have completed a test:
```
<div id="wpm"></div>
```
At first, this is left empty, but the user's WPM is both calculated and shown to the user with `script.js`.  
The next element is to show the user the words they have to type, which is procedurally generated using `Jinja` syntax:  
```
<div id="words">
    {% for word in words %}
        <span class="untyped">{{ word }}</span>
    {% endfor %}
</div>
```
The next element is the input field that the user will use to type their words in:
```
<div id="input">
    <input autofocus autocomplete="off" autocapitalize="off" id="inputfield">
</div>
```
The last element is the restart button, which -- when pressed -- will simply reload the page, which will give the user another set of words to type. This can be triggered at any time. I chose to let them do this, as if they were typing unusually slow during a test, they would be able to get a new set of words. 
### `static/verification.js`
This file provides an object whose purpose is to verify the words that the user types.  
It has two variables of note: `actualWordElement` and `typedWord`. `actualWord` refers to the word that the user was supposed to type, while `typedWord` refers to the word that the user actually typed. `actualWordElement` just stores the `HTML` tag of `actualWord`, which is used to change its look depending on whether the user typed the word incorrectly or not. 
The `verification` object also has two function: `getTypos()`, which is used to get the amount of typos the user makes, and `verifyWordTyped()`, which is used to change the class of the current word, which will change its CSS.  
#### `getTypos()`
This function gets the number of typos the user has made. It first checks for a few things:
```
if (actualWordLength > typedWordLength) {
    numOfTypos += actualWordLength - typedWordLength;
    len = typedWordLength;
}

else if (typedWordLength > actualWordLength) {
    numOfTypos += typedWordLength - actualWordLength;
    len = actualWordLength;
} 
```
The first conditional checks if `actualWord` is longer than `typedWord`. If this is the case, the untyped characters are counted as typos.  
The second conditional checks if `typedWord` is longer than `actualWord`. If this is the case, the extra characters are counted as typos.  
After these conditionals, the function compares `typedWord` and `actualWord`:
```
for (let i = 0; i < len; i++) {
    const typedChar = this.typedWord[i];
    const actualChar = this.actualWord[i];

    if (typedChar !== actualChar) {
        numOfTypos++;
    }
}
```
after which the function returns the number of typos:
```
return numOfTypos;
```
The reason it returns the number of typos is so that it can be added to a running total in `static/script.js`, which is then taken into account when calculating the WPM.
#### `verifyWordTyped()`
This function changes the class of `actualWordElement`, which will change how it looks.  
The function checks for whether the number of typos (which is given as a parameter) is equal to zero:  
```
if (numOfTypos === 0) {
    this.actualWordElement.className = "typed-correct";
} else {
    this.actualWordElement.className = "typed-incorrect";
}
```
In future iterations, it would probably be best to store `numofTypos` as a variable inside of the object, instead of passing it in as a parameter. This would tighten its scope, and clean up the declaration of the function.
### `static/timer.js`
This file includes an object whose purpose is to time the oeriod the user spends completing their test. This is taken into account when calculating the WPM.  
The only variable of real note is `elapsedTimeMinutes`, which is the amount of time (in minutes) the user takes to complete their test.  
#### `startTimer()`
This function is used to start a timer.  
It first gets the current time:
```
this.startTime = new Date().getTime();
```
The function then starts an interval that is set to go off every 1000 milliseconds:
```
this.timerInterval = setInterval(() => {
    ...
}, 1000);
```
This interval updates the elapsed time by subtracting the current time with `startTime`,  divides the result by 60, and rounds it to two decimal digits:
```
let elapsedTime = (new Date().getTime() - this.startTime) / 1000;
// Rounds to two decimal points
this.elapsedTimeMinutes =
    Math.round((elapsedTime / 60) * 100) / 100;
```
#### `stopTimer()`
This function stops the timer, by just clearing the interval set in `startTimer()`:
```
clearInterval(this.timerInterval);
```
### `static/script.js`
#### Variables
`testStarted` is used to track if the test has been started by the user, which is used to start the timer.  
`wordStarted` is used to track if a new word has been started by the user. This means if they finished typing a word, and have moved on to the next one, `wordStarted` would be true. This is used to track which word is the current one, which allows us to change its CSS.   
`totalNumOfTypos` tracks the number of typos the user has made throughout the test. This is taken into consideration when calculating the WPM. 
`totalNumOfCharsTyped` tracks the number of characters that the user has typed. This is taken into consideration when calculating the WPM.  
`input` stores the `HTML` tag of the input field. This allows us to add event listeners that trigger when a key has been pressed.  
`restart` stores the `HTML` tag of the restart button, which allows us to add event listeners for when the user clicks the button.  
 