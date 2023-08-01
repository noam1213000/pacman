'use strict'

const PACMAN = '😆';
var gPacman;
var gDiedGhost = [];

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)

    if (nextCell === WALL) return
    if (nextCell === CHERRY) updateScore(10)
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper === true) return
        gPacman.isSuper = true
        renderGhost()

        setTimeout(changeTOIsSuper, 5000)
    }

    if (nextCell === FOOD) updateScore(1)

    else if (nextCell === GHOST) {
        if (gPacman.isSuper === true) {
            for (var k = 0; k < gGhosts.length; k++) {
                if (gGhosts[k].location.i === nextLocation.i &&
                    gGhosts[k].location.j === nextLocation.j) {
                    gDiedGhost.push(...gGhosts.splice(k, 1))
                }

            }
        } else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }


    function changeTOIsSuper() {
        gPacman.isSuper = false
        gGhosts.push(...gDiedGhost)
        gDiedGhost = []
    }

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    if (!checkFood()) victory()
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}
function renderGhost() {
    for (var i = 0; i < gGhosts.length; i++) {
        renderCell((gGhosts[i].location), getGhostHTML())

    }

}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}