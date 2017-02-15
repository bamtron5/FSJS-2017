var Hangman = (function () {
    function Hangman() {
        this.guesses = 6;
        this.win = false;
        this.cancel = false;
        this.words = [
            'sprinkle',
            'jam',
            'bagel'
        ];
        this.welcome = 'Welcome to hangman.  Please press ok to continue';
        this.begin(this.welcome) ? this.createGame() : alert('See you next time');
    }
    Hangman.prototype.begin = function (message) {
        return confirm(message);
    };
    Hangman.prototype.createGame = function () {
        var randomInt = Math.floor(Math.random() * ((this.words.length - 1) - 0) + 0);
        this.selectedWord = this.words[randomInt];
        this.remainingWord = this.selectedWord.split('');
        this.solvedForWord = this.remainingWord.map(function () { return '_'; });
        this.startGuessing();
    };
    Hangman.prototype.startGuessing = function () {
        this.message = "\n      Your word length is\n      " + this.selectedWord + ".\n      " + this.guesses + "\n      " + (this.guesses === 1 ? 'guess' : 'guesses') + " remain.\n    ";
        while (this.guesses > 0 && !this.win && !this.cancel) {
            var guess = prompt(this.message);
            if (guess === null) {
                this.cancel = true;
            }
            this.checkGuess(guess);
        }
        return this.win ? confirm('You won') : confirm('You lost');
    };
    Hangman.prototype.checkGuess = function (guess) {
        var _this = this;
        var isCorrect = this.remainingWord.some(function (v) { return v === guess; });
        this.solvedForWord = this.selectedWord.split('').map(function (v, i) {
            return v === guess || _this.solvedForWord[i] === v ? v : '_';
        });
        this.remainingWord.map(function (v, i) {
            return v === guess ? '' : v;
        });
        if (this.selectedWord === this.solvedForWord.join('')) {
            this.win = true;
        }
        if (!isCorrect) {
            --this.guesses;
            this.message = "Incorrect guess, " + this.guesses + " remain. Your solved for word is " + this.solvedForWord.join('');
            return;
        }
        else {
            this.message = "Correct guess, " + this.guesses + " remain. Your solved for word is " + this.solvedForWord.join('');
            return;
        }
    };
    return Hangman;
}());
var game = new Hangman();
