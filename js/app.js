let playGridOne
let playGridTwo
let boatGridOne
let boatGridTwo
let turn
let win
let lose

const init = () => {
    let turn = 'playerOne'
    let win = false
    let lose = false
    boatGridOne = createBoatGrid()
    boatGridTwo = createBoatGrid()
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
    let keepGoing = okayToPlace(arr, dir, firstPoint)
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
        return [row,col]
    } else {
        let row = randomInt(10 - leng)
        let col = randomInt(10)
        return [row,col]
    }
}

const okayToPlace = (bLocals, orient, point) => {
    if (orient === 'horizontal') {
        for (let i = 0; i < point.length; i++) {
            if (bLocals[point[0]][point[1] + i] !== false) return false
            else return true
        }
    } else {
        for (let i = 0; i < point.length; i++) {
            if (bLocals[point[0] + i][point[1]] !== false) return false
            else return true
        }
    }
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











const boardOneEl = document.querySelector('#boardOne')
const boardTwoEl = document.querySelector('#boardTwo')


// something is wrong with the row and col refences
const handleShot = (event) => {
    let boatsInPlay = whichPlayerData()
    let row = event.target.parentElement.id
    let col = event.target.id
    let emoji = event.target.innerText
    if (row === '' ||
        win === true ||
        boatsInPlay[row][col] === '5')
        return
    checkHitMiss(boatsInPlay, row, col)
    checkWinner()
    switchPlayer()
}

const whichPlayerData = () => {
    if (turn === 'playerOne') {
        return boatGridOne
    } else return boatGridTwo
}

const checkHitMiss = (barco, r, c) => {
    if ( barco[r][c] === true) {
        emoji = '⛵️'
         barco[r][c] = '10'
    } else {
        emoji = '🎯'
         barco[r][c] = '5'
    } 
}

const checkWinner = () => {
    let tally = 0
    for (let i = 0; i < boatsInPlay.length; i++) {
        for (let j = 0; j < boatsInPlay.length; i++) {
            if (boatsInPlay[row][col] === '10')
                tally += 1
        }
    }
    if (tally === 11)   
        win = true
}

const switchPlayer = () => {
    switch (turn) {
        case 'playerOne':
            turn = 'playerTwo'
        case 'playerTwo':
            turn = 'playerOne'
    }
}

boardOneEl.addEventListener('click',handleShot)
boardTwoEl.addEventListener('click',handleShot)