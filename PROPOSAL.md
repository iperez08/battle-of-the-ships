# MVP user stories:
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
  gridOne = [100 blanks]
  gridTwo = [100 blanks]
  boatGridOne = createBoatGrid()
  boatGridTwo = createBoatGrid()
  win = false
  lose = false
  turn = playerOne
  **stretch goal**
  tie = false
  winMode = all or one
  time = 0
  turnTimeLimit = false or true and specific time
  GameTimeLimit = false or true and specific time
  render()
}

render() {
  updateBoatGrids()
  updateMessages()
}

updateBoatGrid() {
  
}
updateMessages() {

}

handleClick() {
  shootAtOpponent()
  checkHitMiss()
  checkWinner()
  switchPlayer()
  render()
}
