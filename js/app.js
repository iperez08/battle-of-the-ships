let boatGridOne
let boatGridTwo
let winStatusForOne
let winStatusForTwo
let boatsInPlay
let turn
let waiting
let win
let lose
let winTally

const gameStatus = (event) => {
    let id = event.target.id
    let pauseButton = document.getElementById('pause')
    let quitButton = document.getElementById('quit')
    let resumeButton = document.getElementById(`resume`)
    switch (id) {
        case 'settings':
            // changeSettings(newButton,pauseButton,quitButton)
            break
            // eventually put a function to change settings
        case 'new':
            init()
            break
        case 'resume':
            resumeGame(resumeButton,quitButton)
            break
        case 'pause':
            pauseGame(pauseButton, id)
            break
        case 'quit':
            checkQuitGame(pauseButton,quitButton)
            break
        case 'quit-quit':
            byeSound.play()
            setTimeout(quitGame,2000)
            break
    }
}

// const changeSettings = (secondButton,thirdButton,fourthButton) => {
// }

const checkQuitGame = (pauseButton, quitButton) => {
    if (!turn) return
    messageToPlayers('Are you sure you want to quit?')
    pauseBoards(pauseButton)
    quitButton.innerText = 'Yes, quit game.'
    quitButton.id = 'quit-quit'
}

const quitGame = () => {
    location.reload()
}


const pauseGame = (pauseButton, id) => {
    if (!turn) return
    pauseBoards(pauseButton)
    messageToPlayers(`Paused during ${turn}'s turn. Resume whenever you're ready.`)
}

const pauseBoards = (elem) => {
    let activeBoard = turn === 'playerOne'? boardTwo : boardOne
    activeBoard.classList.add('notInPlay')
    elem.id = 'resume'
    elem.innerText = 'Resume Game'
}

const resumeGame = (elem,quitButton) => {
        let activeBoard = turn === 'playerOne'? boardTwo : boardOne
        activeBoard.classList.remove('notInPlay')
        elem.id = 'pause'
        elem.innerText = 'Pause Game'
        messageToPlayers(`${turn}'s turn.`)
        if (!quitButton) {
            elem.nextElementSibling.id = 'quit'
            elem.nextElementSibling.innerText = 'Quit Game'
        }
    }

const init = () => {
    turn = 'playerTwo'
    win = false
    lose = false
    boatGridOne = createBoatGrid(5)
    boatGridTwo = createBoatGrid(5)
    winStatusForOne = {
        '3': 0,
        '4': 0,
        '5': 0
    }
    winStatusForTwo = {
        '3': 0,
        '4': 0,
        '5': 0
    }
    clearTheBoard()
    clearTheTrackers()
    switchPlayer()
}

const clearTheBoard = () => {
    boardOneEls.forEach((el) => {
        el.innerText = ''
    }) 
    boardTwoEls.forEach((el) => {
        el.innerText = ''
    })
}

const clearTheTrackers = () => {
    boatCellsOne.forEach((el) => {
        if (el.classList.contains('sunk')) {
            el.classList.remove('sunk')
        }
    boatCellsTwo.forEach((el) => {
        if (el.classList.contains('sunk')) {
            el.classList.remove('sunk')
        }
    })
    })
}

const createBoatGrid = (size) => {
    let openWater = [
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false, false]
    ]
    let allBoatsArray = placeBoat(openWater, size)
    return allBoatsArray
}

const placeBoat = (arr, boatSize) => {
    if (boatSize < 3) return arr
    let dir = orientBoat()
    let firstPoint = placeFirstBoatItem(dir, boatSize)
    let keepGoing = okayToPlace(arr, dir, boatSize, firstPoint)
    if (keepGoing === true && dir === "horizontal") {
        placeHorizontalBoat(arr, firstPoint, boatSize)
        return placeBoat(arr, boatSize - 1)
    } else if(keepGoing === true && dir === 'vertical') {
        placeVerticalBoat(arr, firstPoint, boatSize)
        return placeBoat(arr, boatSize - 1)
    } else
        return placeBoat(arr,boatSize)
}

const randomInt = (highestValue) => {
    return Math.floor(Math.random()*highestValue)
}

const orientBoat = () => {
    let orientation
    let num = randomInt(20)
    if (num % 2 === 0) {
        orientation = 'horizontal'
    } else orientation = 'vertical'
    return orientation
}

const placeFirstBoatItem = (direction,leng) => {
    if (direction === "horizontal") {
        let row = randomInt(10)
        let col = randomInt(10 - leng)
        return [row,col]
    } else {
        let row = randomInt(10 - leng)
        let col = randomInt(10)
        return [row,col]
    }
}

const okayToPlace = (bLocals, orient, bSize, point) => {
    if (orient === 'horizontal') {
        for (let i = 0; i < (bSize); i++) {
            if (bLocals[point[0]][point[1] + i] !== false) {
                return false
            }
        }
    } else if (orient === 'vertical') {
        for (let i = 0; i < (bSize); i++) {
            if (bLocals[point[0] + i][point[1]] !== false) {
                return false
            }
        }
    }
    return true
}

const placeVerticalBoat = (boatLocals, cordPoints, boatLen) => {
    for (let i = 0; i < boatLen; i++) {
        boatLocals[cordPoints[0] + i].splice(cordPoints[1], 1, boatLen)
    }
}

const placeHorizontalBoat = (boatLoc, array, bLength) => {
    for (let i = 0; i < bLength; i++) {
        boatLoc[array[0]].splice(array[1] + i, 1, bLength)
    }
} 

const boardOne = document.querySelector('#boardOne')
const boardOneEls = boardOne.querySelectorAll('div.row > div')
const boardTwo = document.querySelector('#boardTwo')
const boardTwoEls = boardTwo.querySelectorAll('div.row > div')
const message = document.querySelector('section')
const games = document.querySelector('#action-buttons')
const gameStatusActions = games.querySelectorAll('button')
const boatTrackerOne = document.querySelector('#trackerOne')
const boatCellsOne = boatTrackerOne.querySelectorAll('.boatCell')
const boatTrackerTwo = document.querySelector('#trackerTwo')
const boatCellsTwo = boatTrackerTwo.querySelectorAll('.boatCell')
const funnyExplosion = new Audio('../sounds/funny-explosion.mp3')
const missShot = new Audio('../sounds/drop-1.wav')
const byeSound = new Audio('../sounds/bye.wav')

const handleShot = (event) => {
    boatsInPlay = getOpponentData()
    let row = event.target.parentElement.id
    let col = event.target.id
    if (win === true ||
        col === '' ||
        boatsInPlay[row][col] > 5) {
        return
    }
    let theShotHit = checkIfHit(event, row, col)
    if (theShotHit === true) {
        updateWinStatus(boatType)
        updateBoatTracker()
        let newWinner = checkForWinner()
        if (newWinner !== true) {
            continueShooting()
        } else return
    } else switchPlayer()
}

const getOpponentData = () => {
    if (turn === 'playerOne') {
        return boatGridTwo
    } else {
        return boatGridOne
    }
}   

const checkIfHit = (event, r, c) => {
    if (boatsInPlay[r][c] >= 3 &&
        boatsInPlay[r][c] <= 5) {
        event.target.innerText = '⛵️'
        boatType = boatsInPlay[r][c]
        boatsInPlay[r][c] *= 2
        funnyExplosion.play()
        return true
    } else {
        event.target.innerText = '❌'
        boatsInPlay[r][c] = 11
        missShot.play()
        return false
    }
}

const updateWinStatus = (boatType) => {
    if (turn === 'playerOne') {
        Object.entries(winStatusForOne).forEach((pair) => {
            if((boatType + '') === pair[0]) {
                winStatusForOne[pair[0]] += 1
            }
        })
    } else {
        Object.entries(winStatusForTwo).forEach((pair) => {
            if((boatType + '') === pair[0]) {
                winStatusForTwo[pair[0]] += 1
            }
        })
    }
}

const updateBoatTracker = () => {
    if (turn === 'playerOne') {
        Object.entries(winStatusForOne).forEach(([key, value]) => {
            if (key === (value + '')) {
                boatCellsTwo.forEach((el) => {
                    if (el.id === (value + '')) {
                        el.classList.add('sunk')
                    }
                })
            }
        })
    } else {
        Object.entries(winStatusForTwo).forEach(([key, value]) => {
            if (key === (value + '')) {
                boatCellsOne.forEach((el) => {
                    if (el.id === (value + '')) {
                        el.classList.add('sunk')
                    }
                })
            }
        })
    }
}

const checkForWinner = () => {
    winTally = 0
    if (turn === 'playerOne') {
        Object.entries(winStatusForOne).forEach(([key, value]) => {
            if (key === (value + '')) {
                winTally +=1
            }
        })
    } else {
        Object.entries(winStatusForTwo).forEach(([key, value]) => {
            if (key === (value + '')) {
                winTally +=1
            }
        })
    }
    if (winTally === 3 && turn === 'playerOne') {
        win = true
        boardTwo.removeEventListener('click', handleShot, {once: true})
        messageToPlayers(`${turn} wins!`)
        return true
    }
    if (winTally === 3 && turn === 'playerTwo') {
        win = true
        boardOne.removeEventListener('click', handleShot, {once: true})
        messageToPlayers(`${turn} wins!`)
        return true
    } else return false
}

const continueShooting = () => {
    if (turn === 'playerOne') {
        playerOneShoots()
    } else {
        playerTwoShoots()
    }
}

const switchPlayer = () => {
    switch (turn) {
        case 'playerOne':
            turn = 'playerTwo'
            switchBoardInPlay()
            break
        case 'playerTwo':
            turn = 'playerOne'
            switchBoardInPlay()
            break
    }
}

const switchBoardInPlay = () => {
    turn === 'playerOne'? playerOneShoots() : playerTwoShoots()
}

const playerOneShoots = () => {
    boardOne.removeEventListener('click',handleShot, {once: true})
    boardTwo.addEventListener('click', handleShot, {once: true})
    setTimeout(disableBoard,2000)
    messageToPlayers(`${turn}\'s turn.`)
}

const playerTwoShoots = () => {
    boardOne.addEventListener('click', handleShot, {once: true})
    boardTwo.removeEventListener('click',handleShot, {once: true})
    setTimeout(disableBoard,2000)
    messageToPlayers(`${turn}\'s turn.`)
}

const disableBoard = (id) => {
    if (turn === 'playerOne') {
        boardOne.classList.add('notInPlay')
        boardTwo.classList.remove('notInPlay')
    } else {
        boardOne.classList.remove('notInPlay')
        boardTwo.classList.add('notInPlay')
    }
}

const messageToPlayers = (string) => {
    message.innerText = string
}

boardOne.addEventListener('click',handleShot,{once: true})
boardTwo.addEventListener('click',handleShot,{once: true})
games.addEventListener('click',gameStatus)

