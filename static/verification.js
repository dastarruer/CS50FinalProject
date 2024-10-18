// A verification object to check whether the user types a word correctly and how many typos they made
export let verification = {
    actualWordElement: null,
    typedWord: null,

    getTypos: function () {
        this.actualWord = this.actualWordElement.innerHTML;
        this.numOfTypos = 0;

        const len = this.typedWord.length;
        for (let i = 0; i < len; i++) {
            const typedChar = this.typedWord[i];
            const actualChar = this.actualWord[i];
            
            // If actualChar is null, that means that the typedWord is longer than actualWord
            if (actualChar === null) {
                numOfTypos += typedWord.length - actualWord.length;
                break;
            }
            else if (typedChar !== actualChar) {
                this.numOfTypos++;
            } 
        }
        return this.numOfTypos;
    },

    verifyWordTyped: function (numOfTypos) {
        if (numOfTypos === 0) {
            this.actualWordElement.className = "typed-correct";
        } else {
            this.actualWordElement.className = "typed-incorrect";
        }
    },
}