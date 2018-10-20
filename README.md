# project-0-Gwanom
This project is a webpage that allows you to play a game of
blackjack against a computer controlled "dealer"

Current features:
    Draw a card from the deck of cards API
        It is added to your hand as an image
   
    Start a new game
        Clear your hand and reshuffle the deck

Planned/Future features:
    The new game button will also deal two cards each
    to the player and the "dealer"

    Immediately upon dealing, the script should check for a blackjack
    condition in both hands. 
        If the player has a natural (any face card or 10 and an ace),
        and the dealer does not, the player wins and vice-versa.
        If both the player and dealer have naturals it is considered
        a tie, and neither win counter should be updated

    After dealing, the player sill be given two options:
        Hit
            Using the deck of cards API, an additional card
            is added to the players hand
            If the total exceeds 21, the player busts and it
            becomes the dealer's turn
        Stay
            The total remains unchanged and it becomes the
            dealer's turn
    
    On the dealer's turn, the face-down card is revealed.
    If the dealer's total is 17 or more, the computer will stand
    If the total is <= 16, the computer will hit until the total >= 17
    If the dealer has an ace and counting it as 11 would make the total
    >= 17, the computer will stand

    The div vields "playerTotal" and "houseTotal" shall dynamically
    update to show the current total of the cards in the player's
    and the dealer's hands respectively

    There shall exist a text field for both the player and dealer that
    keeps count of th enumber of games won by each. it should ony reset
    if the page is reloaded

    The script shall follow the rules of blackjack as outlined at
    https://www.bicyclecards.com/how-to-play/blackjack/