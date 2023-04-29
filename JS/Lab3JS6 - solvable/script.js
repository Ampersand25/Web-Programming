/*
Enunt:
O pagina HTML va contine un tabel cu n linii si n coloane.
Celulele tabelului contin numere de la 1 la n^2 intr-o ordine aleatoare.
Una dintre celule este libera.
Folosind JavaScript sa se creeze in cadrul paginii un joc de tip puzzle care la apasarea tastelor sageti va interschimba celula libera cu celula adiacenta (corespunzatoare tastei sus, jos, stanga, dreapta apasata).
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

const canvas = document.getElementById("confetti");
const jsConfetti = new JSConfetti();

let numberOfPassedSeconds;

function updateSecondsCounter() {
    ++numberOfPassedSeconds;

    const secondsCounter = document.getElementById("play-time");
    secondsCounter.innerHTML = `<u>Total play time</u>: ${numberOfPassedSeconds}s`;
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let randomColor = "#";
    for(let i = 0; i < 6; ++i) {
        randomColor += letters[getRandomNumber(16)];
    }
    return randomColor;
}

function setInitialHiddenNumber(hiddenNumber, n) {
    hiddenNumber.row = n - 1;
    hiddenNumber.col = n - 1;
    hiddenNumber.val = n * n;
}

function computeInitialGameTable(table, n) {
    for(let i = 0; i < n; ++i) {
        const newRow = table.insertRow();
        for(let j = 0; j < n; ++j) {
            const newCell = newRow.insertCell(j);
            if(i === n - 1 && j === n - 1) {
                newCell.innerHTML = "";
                newCell.style.color = "black";
            }
            else {
                newCell.innerHTML = `${i * n + j + 1}`;
                newCell.style.color = `${getRandomColor()}`;
            }
            newCell.style.fontWeight = "bold";
            newCell.id = `row${i} col${j}`;
        }
    }
}

function getPossibleMoves(hiddenNumber, n) {
    const result = [];
    if(hiddenNumber.row > 0) {
        result.push("UP");
    }
    if(hiddenNumber.col < n - 1) {
        result.push("RIGHT");
    }
    if(hiddenNumber.row < n - 1) {
        result.push("DOWN");
    }
    if(hiddenNumber.col > 0) {
        result.push("LEFT");
    }
    return result;
}

function getPosition(list, element) {
    return list.indexOf(element);
}

function reverseMove(move) {
    if(move === undefined) {
        return undefined;
    }
    if(move === "UP") {
        return "DOWN";
    }
    if(move === "RIGHT") {
        return "LEFT";
    }
    if(move === "DOWN") {
        return "UP";
    }
    return "RIGHT";
}

function removeElementFromList(list, element) {
    if(element !== undefined) {
        list.splice(getPosition(list, element), 1);
    }
}

function getRandomMove(possibleMoves) {
    return possibleMoves[getRandomNumber(possibleMoves.length)];
}

function doShuffle(hiddenNumber, n, lastMove, shuffleNumber) {
    const possibleMoves = getPossibleMoves(hiddenNumber, n);
    removeElementFromList(possibleMoves, reverseMove(lastMove));
    const randomMove = getRandomMove(possibleMoves);
    console.log(`SHUFFLE NUMBER: ${shuffleNumber}\nAVAILABLE MOVES: ${possibleMoves}\nCHOSEN MOVE: ${randomMove}`);
    console.log("\n");
    switch(randomMove) {
        case "UP":
            arrowUpPressed(hiddenNumber, n);
            break;
        case "RIGHT":
            arrowRightPressed(hiddenNumber, n);
            break;
        case "DOWN":
            arrowDownPressed(hiddenNumber, n);
            break;
        default:
            arrowLeftPressed(hiddenNumber, n);
    }
    return randomMove;
}

function computeShuffledTable(table, hiddenNumber, n, numberOfShuffles) {
    let lastMove = undefined;
    for(let i = 1; i <= numberOfShuffles; ++i) {
        lastMove = doShuffle(hiddenNumber, n, lastMove, i);
    }
}

function displayInitialGameStatus(hiddenNumber) {
    console.log(`HIDDEN NUMBER: ${hiddenNumber.val}`);
    console.log(`HIDDEN NUMBER ROW: ${hiddenNumber.row}`);
    console.log(`HIDDEN NUMBER COL: ${hiddenNumber.col}`);
}

function computeGameTable(n, hiddenNumber, numberOfShuffles) {
    const table = document.getElementById("game-table");

    setInitialHiddenNumber(hiddenNumber, n);
    computeInitialGameTable(table, n);
    computeShuffledTable(table, hiddenNumber, n, numberOfShuffles);

    displayInitialGameStatus(hiddenNumber);
}

function interchangeCells(firstCellID, secondCellID) {
    let firstCell = document.getElementById(firstCellID);
    let secondCell = document.getElementById(secondCellID);

    const auxInnerHTML = firstCell.innerHTML;
    firstCell.innerHTML = secondCell.innerHTML;
    secondCell.innerHTML = auxInnerHTML;

    const auxStyleColor = firstCell.style.color;
    firstCell.style.color = secondCell.style.color;
    secondCell.style.color = auxStyleColor;
}

function arrowUpPressed(hiddenNumber, n) {
    if(hiddenNumber.row > 0) {
        const hiddenCellID = `row${hiddenNumber.row} col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row - 1} col${hiddenNumber.col}`;
        interchangeCells(hiddenCellID, upCellID);

        --hiddenNumber.row;
    }
}

function arrowRightPressed(hiddenNumber, n) {
    if(hiddenNumber.col + 1 < n) {
        const hiddenCellID = `row${hiddenNumber.row} col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row} col${hiddenNumber.col + 1}`;
        interchangeCells(hiddenCellID, upCellID);

        ++hiddenNumber.col;
    }
}

function arrowDownPressed(hiddenNumber, n) {
    if(hiddenNumber.row + 1 < n) {
        const hiddenCellID = `row${hiddenNumber.row} col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row + 1} col${hiddenNumber.col}`;
        interchangeCells(hiddenCellID, upCellID);

        ++hiddenNumber.row;
    }
}

function arrowLeftPressed(hiddenNumber, n) {
    if(hiddenNumber.col > 0) {
        const hiddenCellID = `row${hiddenNumber.row} col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row} col${hiddenNumber.col - 1}`;
        interchangeCells(hiddenCellID, upCellID);

        --hiddenNumber.col;
    }
}

function getNumberFromTable(r, c) {
    const currentCellID = `row${r} col${c}`;
    return document.getElementById(currentCellID).innerHTML;
}

function gameFinished(n, hiddenNumber) {
    let prevValue = 0;
    for(let i = 0; i < n; ++i) {
        for(let j = 0; j < n; ++j) {
            let currentValue = (i === hiddenNumber.row && j === hiddenNumber.col) ? (hiddenNumber.val) : (parseInt(getNumberFromTable(i, j)));
            if(prevValue > currentValue) {
                return false;
            }
            prevValue = currentValue;
        }
    }
    return true;
}

function updateNumberOfMovesSpan(currentNumberOfMoves) {
    const numberOfMovesSpanElement = document.getElementById("no-of-moves");
    numberOfMovesSpanElement.innerHTML = `<u>Number of moves</u>: ${currentNumberOfMoves}`;
}

function displayCurrentGameStatus(hiddenNumber) {
    console.log(`NEW HIDDEN ROW: ${hiddenNumber.row}`);
    console.log(`NEW HIDDEN COL: ${hiddenNumber.col}`);
}

function winHandler(timer) {
    clearInterval(timer);
    jsConfetti.addConfetti({
        emojis: ['🦄', '🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    }).then(() => { alert("YOU WIN!"); });
}

function startGame(n, hiddenNumber, timer) {
    console.log("\n");
    console.log("*GAME HAS STARTED*");

    if(gameFinished(n, hiddenNumber)) {
        winHandler(timer);
        return;
    }

    let win = false;
    let numberOfMoves = 0;

    document.addEventListener("keydown", (event) => {
            let validMove = true;
            if(event.key === "ArrowUp" && hiddenNumber.row !== 0) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nUP arrow key pressed`);
                arrowUpPressed(hiddenNumber, n);
            }
            else if(event.key === "ArrowRight" && hiddenNumber.col < n - 1) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nRIGHT arrow key pressed`);
                arrowRightPressed(hiddenNumber, n);
            }
            else if(event.key === "ArrowDown" && hiddenNumber.row < n - 1) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nDOWN arrow key pressed`);
                arrowDownPressed(hiddenNumber, n);
            }
            else if(event.key === "ArrowLeft" && hiddenNumber.col !== 0) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nLEFT arrow key pressed`);
                arrowLeftPressed(hiddenNumber, n);
            }
            else {
                validMove = false;
            }

            if(validMove) {
                updateNumberOfMovesSpan(numberOfMoves);
                displayCurrentGameStatus(hiddenNumber);
            }

            if(gameFinished(n, hiddenNumber)) {
                winHandler(timer);
                win = true;
            }
    });
}

function createGame(n, numberOfShuffles) {
    numberOfPassedSeconds = 0;
    updateSecondsCounter();
    const timer = setInterval(updateSecondsCounter, 1000);

    let hiddenNumber = {val: undefined, row: undefined, col: undefined};
    computeGameTable(n, hiddenNumber, numberOfShuffles);

    startGame(n, hiddenNumber, timer);
}

function generateGame() {
    const gameSize = document.getElementById("table-size-input").value;
    const numberOfShuffles = document.getElementById("number-of-shuffles-input").value;
    createGame(gameSize, numberOfShuffles);

    const generateGameButton = document.getElementById("generate-game-button");
    generateGameButton.disabled = true;
}