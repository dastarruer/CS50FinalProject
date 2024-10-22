# TypeSpeed
## TODO: Add video
## Description:
TypeSpeed is an online typing test that allows you to test your typing speed, measured in WPM (Words-Per-Minute).
### `app.py`
Starting with `app.py`, this is the back-end of the website. It is made with Flask in Python. This is used to generate the words in the user's test. 
```
numOfWords = 30
words = []
```
The `numOfWords` variable is the number of words that the user must type to get their results, while `words = []` are the words that the user must type.  
The words that the user can get are inside of `words.txt`, where a list of ~100 words can be found. They are all two or less syllables. This number was chosen to make the test feel much snappier, rather than giving the user long words that take too long to type. `app.py` opens this file with:
```
with open("words.txt", 'r') as file:  
    words = file.readlines()
```  
Then, `app.py` takes a sample of words from the file:  
`words = sample(words, numOfWords)`  
Lastly, the program processes the list by stripping any whitespace or newlines, and removing any duplicates with the `set()` function:  
`words = set([word.strip() for word in words])`
### `templates/layout.html`
`layout.html` is the skeleton of all of the `HTML` files in the website.  
It includes the JavaScript and CSS files that the website uses:  
```
<script type="module" src="./static/script.js"></script>
<link rel="stylesheet" href="static/styles.css">
```   
Notably, the `<script>` tag is given an attribute: `type="module"`, which allows me to import other files into the `static/script.js` file.  
### `templates/index.html`
This is the page in which the user will be doing their typing tests. The first `<div>` is:  
```
<div>
    <h2 id="wpm"></h2>
</div>
```  
This is what will display the user's words-per-minute at the end of every test. However, during the test, it is empty until `static/script.js` adds a value to it.  
Next is what will display the words that the user must type.
```
<div id="words">
    {% for word in words %}
        <span class="untyped">{{ word }}</span>
    {% endfor %}
</div>
```
This uses Jinja to generate HTML for each word. The `<span>` tag with the attribute `class="untyped"` is used to apply special CSS to words that have not been typed.  
Next is what the user uses to type out each word. It uses an `<input>` tag
```
<div id="input">
    <input autofocus autocomplete="off" autocapitalize="off" id="inputfield">
</div>
```  
The last thing of note is the restart button, which (as the name suggests) restarts the test. It does so by simply reloading the page.
```
<div>
    <button type="button" id="restart">Restart</button>
</div>
```
### `static/verification.js`
This file contains an an object called `verification` meant to process words after the user has typed them.  
The first two variables of the object are:
```
actualWordElement: null,
typedWord: null,
```  
`actualWordElement` is where the actual word that the user was supposed to type is stored. Or rather, the `<span>` tag storing the actual word. This is different from `typedWord`, which stores the word that the user typed. The reason `actualWordElement` is stored as an element rather than a string is to apply CSS to it if the word was typed correctly or incorrectly.  
#### `getTypos`
This function is used to get the number of typos the user has made. This checks `typedWord` against `actualWord`. The first condition it checks for is:
```
if (actualWordLength > typedWordLength) {
    numOfTypos += actualWordLength - typedWordLength;
    len = typedWordLength;
}
```
Here, if the user has typed less characters than in the actual word, we count the missed characters as typos. So if -- for example -- the user has to type 'actual,' but the user only typed 'actua,' the missed 'l' s counted as a typo.  
The same can be seen in the next condiitonal:
```
 else if (typedWordLength > actualWordLength) {
    numOfTypos += typedWordLength - actualWordLength;
    len = actualWordLength;
} 
```
Here, if the user types more characters than in the actual word, those extraneous characters are counted as typos as well.  