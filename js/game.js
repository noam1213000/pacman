'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🥩'
const CHERRY = '🍒'
var gIntervalCherry
var gGame = {
    score: 0,
    isOn: false
}
var gBoard

function init() {
    gGame.score=0
    updateScore(0)
    const elVictoryModal = document.querySelector('.modal2')
    elVictoryModal.style.display = 'none'
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard, '.board-container')
     gIntervalCherry=setInterval(addCherry,5000)
    gGame.isOn = true
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][1] = SUPERFOOD
    board[(SIZE - 2)][(SIZE - 2)] = SUPERFOOD
    board[(SIZE - 2)][1] = SUPERFOOD
    board[1][(SIZE - 2)] = SUPERFOOD
    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    clearInterval(gIntervalCherry)

    gGame.isOn = false
    clearInterval(gIntervalGhosts)
}

function checkFood() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === FOOD) return true

        }

    }
    return false
}

function victory() {
    console.log('victory')
    const elVictoryModal = document.querySelector('.modal2')
    elVictoryModal.style.display = 'block'
    clearInterval(gIntervalGhosts)

}
function getRandEmptyCell() {
    const emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({ i, j })
            }
        }
    }
    if (emptyCells === 0) return null
    var randIdx = getRandomIntInclusive(0, emptyCells.length - 1)
    return emptyCells[randIdx]
}

function addCherry() {
    var emptyCell = getRandEmptyCell()
    if (!emptyCell) return
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
}