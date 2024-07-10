<!-- # MVP user stories:
I can start a game and see a link to send to my friend, so that we can play together.
I can see my grid and squares that represent the boats that I will be defending on my screen.
I can see a blank grid that represents my opponents screen so that I can shoot.
I can see where my cursor is hovering on my opponents grid, so that I can click on the correct square.
I can click on a square to represent a shot at my opponent, so that I can keep track of which squares I shot.
I can see if a shot hit or miss, so that I can keep track of which squares no longer in play and plan my next shot.
I can continue my play if I hit a boat, so that I can keep shooting at my opponent's boats.
I can see if a boat has been sunk, so that I can plan my next shot.
I can see the quantity and size of my opponent's boats, so that I can keep track of my progress.
I can forfeit a game, so that I can tell my opponent that I cannot or do not want to continue.

#Stretch Goals:
I can pause a game, so that my opponent (or I, if my opponent pauses) can know that the other player is not currently playing.
I can ask the game to come up with a different layout for my boats.
I can create my own layout for my boats.
I can change the win conditions of my game, so that I can increase or decrease the difficulty of the game.
  win conditions:
    1. First player to sink 1 ship wins.
    2. First player to sink all ships wins.
I can change the play conditions of my game, so that I can increase or decrease the difficulty of the game.
  play conditions:
    1. set time limit per turn before forfeiting the turn
    2. set a limit on the number of turns before ending the game and deciding a winner
    3. set a time limit before ending the game and deciding a winner
    4. keep track of time/turns for me and my opponent

Pseudocode:

init() = {
  gridOne = [100 blanks or FALSE]
  gridTwo = [100 blanks or FALSE]
  boatGridOne = createBoatGrid()
  boatGridTwo = createBoatGrid()
  win = false
  lose = false
  turn = playerOne
  **stretch goal**
  tie = TRUE
  winMode = all or one
  time = 0
  turnTimeLimit = TRUE and default time or FALSE
  GameTimeLimit = TRUE and default time or FALSE
  turnLimit = TRUE and default turns or FALSE
  **stretch goal**
  render() 
}

render() {
  updateGrids()
  updateMessages()
}

updateGrids() {
  loops through the gridOne and gridTwo arrays and uses DOM to update 
  the grid that players see on the browser
}
updateMessages() {
  tells the players whose turn it is, if anyone has won, if time has run out, or if turns have run out
}

createBoatGrid() {
  a grid with specific number of boats with specific sizes in random locations
    place boats at random locations in order from largest to smallest
      must check if the items are blank or not in the arrays within the array
}

handleClick() { 
  shootAtOpponent() 
  checkHitMiss() 
  checkWinner() 
  switchPlayer() 
  render() 
}

shootAtOpponent() {
  place a true or false at some specific item in gridOne[i][j] or gridTwo[i][j]
}
checkHitMiss() 
  IF hit
    THEN prompt [turn] to click another square and [turn] stays the same
  ELSE miss()
checkWinner() 
  IF gridOne = boatGridTwo
    THEN winner = true
  return [turn]
switchPlayer() 
  IF winner = true
    THEN return
  ELSE IF turn = playerOne
    THEN turn = playerTwo
  ELSE turn = playerOne
-->

how do i keep track of my the arrays when they have two different users?