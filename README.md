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
