var gameDeck = {};

//TODO: function should support drawing a variable number of cards
//this function may no longer be able to see playerHand
function drawCards(cardCount){
    fetch(`https://deckofcardsapi.com/api/deck/${gameDeck.deck_id}/draw/?count=${cardCount}`)
            .then(res => res.json())
            .then(newCard => {
                //this part is broken for cardCount > 1
                let img = document.createElement("img");
                img.setAttribute("src", newCard.cards[0].image);
                //if this fucks up jose was right
                img.setAttribute("width", "20%");
                playerHand.appendChild(img);
            })
            .catch(err => console.log(err));
}

document.addEventListener("DOMContentLoaded", () => {
    let playerGamesWon = houseGamesWon = 0;
    let newBtn = document.getElementById("newGame");
    let drawBtn = document.getElementById("drawCard");
    let playerScore = document.getElementById("playerTotal");
    let playerHand = document.getElementById("playerHand");
    let houseScore = document.getElementById("houseTotal");
    let houseHand = document.getElementById("houseHand");

    //generate a new deck to play the game
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(parsed => {
            gameDeck = parsed;
        });

    //the new game button resets the game area    
    newBtn.addEventListener("click", event => {
        fetch(`https://deckofcardsapi.com/api/deck/${gameDeck.deck_id}/shuffle/`)
            // .json() method returns a Promise
            // of the response body parsed from JSON
            .then(res => res.json())
            .then(deck => {
                playerHand.innerHTML = "";
                //TODO: deal 2 cards to the player and dealer
                //the dealer's first card should not be visible 
                //to the player TODO: get back of card image
            })
            //.then(drawCards(2)) ??
            .catch(err => console.log(err));
    });

    drawBtn.addEventListener("click", drawCards(1));
});
// obj.cards.forEach(x =>{
//     let img = document.createElement("img");
//     img.setAttribute("src", x.image);
//     img.setAttribute("width", "10%");
    // playerHand.appendChild(img);
// });
// x => { x + 5; }
// let f = (x => x + 5);
// (function (x) { return x + 5 })


// q = f(q);
// X << X+5