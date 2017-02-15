/*jshint esversion: 6 */

let suits = ['spades', 'hearts', 'clubs', 'diamonds'];
let deck = [
  [2, suits[0]],
  [2, suits[1]],
  [2, suits[2]],
  [2, suits[3]],
  [3, suits[0]],
  [3, suits[1]],
  [3, suits[2]],
  [3, suits[3]],
  [4, suits[0]],
  [4, suits[1]],
  [4, suits[2]],
  [4, suits[3]],
  [5, suits[0]],
  [5, suits[1]],
  [5, suits[2]],
  [5, suits[3]],
  [6, suits[0]],
  [6, suits[1]],
  [6, suits[2]],
  [6, suits[3]],
  [7, suits[0]],
  [7, suits[1]],
  [7, suits[2]],
  [7, suits[3]],
  [8, suits[0]],
  [8, suits[1]],
  [8, suits[2]],
  [8, suits[3]],
  [9, suits[0]],
  [9, suits[1]],
  [9, suits[2]],
  [9, suits[3]],
  [10, suits[0]],
  [10, suits[1]],
  [10, suits[2]],
  [10, suits[3]],
  [11, suits[0]],
  [11, suits[1]],
  [11, suits[2]],
  [11, suits[3]],
  [12, suits[0]],
  [12, suits[1]],
  [12, suits[2]],
  [12, suits[3]],
  [13, suits[0]],
  [13, suits[1]],
  [13, suits[2]],
  [13, suits[3]],
  [14, suits[0]],
  [14, suits[1]],
  [14, suits[2]],
  [14, suits[3]]
];

let strongSuits = {
  11: 'jack',
  12: 'queen',
  13: 'king',
  14: 'ace'
};

function getHand(count){
  return new Promise(function(resolve,reject) {
    if(count >= 53 || !Number(count)){
      return reject('52 cards or less, you must pass a number.');
    }
    count = count ? count : 5;
    let cards = [];
    let x = 0;
    while(x <= (count - 1)){
      x++;
      let i = Math.ceil(Math.random() * (51 - 0)) + 0;

      let isDupe = cards.some(function(v){
        return deck[i] === v;
      });

      if(isDupe) {
        x--;
      } else {
        cards.push(deck[i]);
      }
      isDupe ? console.log(`isDupe: ${isDupe} ${deck[i]} ${cards} `) : null;
    }
    return resolve(cards);
  });
}
getHand(process.argv[2]).then(function(cards){
  console.log(`there are ${process.argv[2]} cards.\n`);
  cards.forEach(function(card){
    card.forEach(function(cardProp){
      let verbose = typeof cardProp === 'number' ? ' of ' : '\n';
      cardProp = typeof cardProp === 'number' && cardProp >= 11 ? strongSuits[cardProp.toString()] : cardProp;
      return console.log(`${cardProp}${verbose}`);
    });
  });
}).catch(function(e){
  return console.log(e);
});
