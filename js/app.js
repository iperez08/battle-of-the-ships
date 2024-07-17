let boatGridOne
let boatGridTwo
let boatsInPlay
let turn
let win
let lose
let tallyOne
let tallyTwo


const gameStatus = (event) => {
    let id = event.target.id
    switch (id) {
        case 'settings':
            break
            // eventually put a function to change settings
        case 'new':
            init()
            break
        case 'pause':
            break
            // eventually put a function to change settings
        case 'quit':
            break
            // eventually put a function to change settings
    }
}

const init = () => {
    turn = 'playerTwo'
    win = false
    lose = false
    boatGridOne = createBoatGrid()
    boatGridTwo = createBoatGrid()
    switchPlayer()
}

const createBoatGrid = () => {
    let boats = [
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
    let array1 = placeBoat(boats, 5)
    let array2 = placeBoat(array1, 4)
    let allBoatsPlaced = placeBoat(array2, 3)
    return allBoatsPlaced
}

const placeBoat = (arr, boatSize) => {
    let dir = orientBoat()
    let firstPoint = placeFirstBoatItem(dir, boatSize)
    let keepGoing = okayToPlace(arr, dir, boatSize, firstPoint)
    if (keepGoing === true && dir === "horizontal") {
        placeHorizontalBoat(arr, firstPoint, boatSize)
    } else if(keepGoing === true && dir === 'vertical') {
        placeVerticalBoat(arr, firstPoint, boatSize)
    } else placeBoat(arr, boatSize)
    return arr
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
        console.log([row,col])
        return [row,col]
    } else {
        let row = randomInt(10 - leng)
        let col = randomInt(10)
        console.log([row,col])
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
        boatLocals[cordPoints[0] + i].splice(cordPoints[1], 1, true)
    }
}

const placeHorizontalBoat = (boatLoc, array, blength) => {
    for (let i = 0; i < blength; i++) {
        boatLoc[array[0]].splice(array[1] + i, 1, true)
    }
} 

const boardOne = document.querySelector('#boardOne')
const boardOneEls = boardOne.querySelectorAll('div.row > div')
const boardTwo = document.querySelector('#boardTwo')
const boardTwoEls = boardTwo.querySelectorAll('div.row > div')
const message = document.querySelector('section')
const games = document.querySelector('#action-buttons')
const gameStatusActions = games.querySelectorAll('button')

const handleShot = (event) => {
    boatsInPlay = getOpponentData()
    let row = event.target.parentElement.id
    let col = event.target.id
    // already sort of preventing col === '' with {once: true}
    if (win === true ||
        col === '' ||
        boatsInPlay[row][col] > 1) {
        return
    }
    let theShotHit = checkIfHit(event, row, col)
    checkForWinner()
    getNextShot(theShotHit)
}

const getOpponentData = () => {
    if (turn === 'playerOne') {
        return boatGridTwo
    } else {
        return boatGridOne
    }
}   

const checkIfHit = (event, r, c) => {
    if (boatsInPlay[r][c] === true) {
        event.target.innerText = '⛵️'
        boatsInPlay[r][c] = '10'
        return true
    } else {
        event.target.innerText = '🎯'
        boatsInPlay[r][c] = '5'
        return false
    }
}

const checkForWinner = () => {
    tallyOne = 0
    tallyTwo = 0
    for (let i = 0; i < boatsInPlay.length; i++) {
        for (let j = 0; j < boatsInPlay.length; j++) {
            if (boatsInPlay[i][j] === '10' && turn === 'playerOne') {
                tallyOne += 1
            }
            if (boatsInPlay[i][j] === '10' && turn === 'platerTwo') {
                tallyTwo += 1
            } 
        }
    }
    if (tallyOne === 12) {
        win = true
        boardTwo.removeEventListener('click', handleShot, {once: true})
    }
    if (tallyTwo === 12) {
        win = true
        boardOne.removeEventListener('click', handleShot, {once: true})
    }
    console.log(tallyOne,tallyTwo)
    messageToPlayers(`${turn} wins!`)
}

const getNextShot = (hit) => {
    if (hit === true) {
        continueShooting()
    } else switchPlayer()
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
    if (turn === 'playerOne') {
        playerOneShoots()
    } else {
        playerTwoShoots()
    }
}

const playerOneShoots = () => {
    boardOne.removeEventListener('click',handleShot, {once: true})
    boardTwo.addEventListener('click', handleShot, {once: true})
    messageToPlayers(`${turn}\'s turn.`)
}

const playerTwoShoots = () => {
    boardOne.addEventListener('click', handleShot, {once: true})
    boardTwo.removeEventListener('click',handleShot, {once: true})
    messageToPlayers(`${turn}\'s turn.`)
}

const messageToPlayers = (string) => {
    message.innerText = string
}

boardOne.addEventListener('click',handleShot,{once: true})
boardTwo.addEventListener('click',handleShot,{once: true})
games.addEventListener('click',init)