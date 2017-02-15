class Hangman {
  public welcome:string;
  public words:Array<string>;
  public guesses:number = 6;
  public win:boolean = false;
  public selectedWord:string;
  public remainingWord:Array<string>;
  public solvedForWord:Array<string>;
  public message:string;
  public cancel:boolean = false;
  constructor(){
    this.words = [
      'sprinkle',
      'jam',
      'bagel'
    ];
    this.welcome = 'Welcome to hangman.  Please press ok to continue';
    this.begin(this.welcome) ? this.createGame() : alert('See you next time');
  }

  begin(message) {
    return confirm(message);
  }

  createGame() {
    let randomInt = Math.floor(Math.random() * ((this.words.length - 1) - 0) + 0);
    this.selectedWord = this.words[randomInt];
    this.remainingWord = this.selectedWord.split('');
    this.solvedForWord = this.remainingWord.map(() => '_');
    console.log(this.selectedWord);
    this.startGuessing();
  }

  startGuessing() {
    this.message = `Start guessing.  ${this.guesses} ${this.guesses === 1 ? 'guess' : 'guesses'} remain.`;
    while(this.guesses > 0 && !this.win && !this.cancel) {
      var guess = prompt(this.message);
      if(guess === null) {
        this.cancel = true;
      }
      this.checkGuess(guess);
    }
    return this.win ? confirm('You won') : confirm('You lost');
  }

  checkGuess(guess:string) {
    let isCorrect = this.remainingWord.some((v) => v === guess);

    this.solvedForWord = this.selectedWord.split('').map((v,i) => {
      return v === guess || this.solvedForWord[i] === v ? v : '_';
    });

    this.remainingWord.map((v,i) => {
      return v === guess ? '' : v;
    });

    if(this.selectedWord === this.solvedForWord.join('')) {
      this.win = true;
    }

    if(!isCorrect){
      --this.guesses;
      this.message = `Incorrect guess, ${this.guesses} remain. Your solved for word is ${this.solvedForWord.join('')}`;
      return;
    } else {
      this.message = `Correct guess, ${this.guesses} remain. Your solved for word is ${this.solvedForWord.join('')}`;
      return;
    }
  }
}

let game = new Hangman();
