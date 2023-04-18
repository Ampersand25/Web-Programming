/*
Enunt:
O pagina HTML va contine un tabel cu n linii si n coloane.
Celulele tabelului contin numere de la 1 la n^2 intr-o ordine aleatoare.
Una dintre celule este libera.
Folosind JavaScript sa se creeze in cadrul paginii un joc de tip puzzle care la apasarea tastelor sageti va interschimba celula libera cu celula adiacenta (corespunzatoare tastei sus, jos, stanga, dreapta apasata).
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

let numberOfPassedSeconds;

function updateSecondsCounter() {
    ++numberOfPassedSeconds;

    const secondsCounter = document.getElementById("play-time");
    secondsCounter.innerHTML = `<u>Total play time</u>: ${numberOfPassedSeconds}s`;
}

function createSet(n) {
    const mySet = new Set();
    for(let i = 1; i <= n * n; ++i) {
        mySet.add(i);
    }
    return mySet;
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function createArray(mySet) {
    const randomNumbersArray = [];
    while(mySet.size !== 0) {
        const setToArray = Array.from(mySet);
        const randomIndex = getRandomNumber(setToArray.length);
        const randomNumber = setToArray[randomIndex];

        randomNumbersArray.push(randomNumber);
        mySet.delete(randomNumber);
    }
    return randomNumbersArray;
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let randomColor = "#";
    for(let i = 0; i < 6; ++i) {
        randomColor += letters[getRandomNumber(16)];
    }
    return randomColor;
}

function displayInitialGameStatus(hiddenNumber) {
    console.log(`HIDDEN NUMBER: ${hiddenNumber.val}`);
    console.log(`HIDDEN NUMBER ROW: ${hiddenNumber.row}`);
    console.log(`HIDDEN NUMBER COL: ${hiddenNumber.col}`);
}

function computeGameTable(n, randomNumbersArray, hiddenNumber) {
    const table = document.getElementById("game-table");

    hiddenNumber.row = getRandomNumber(n);
    hiddenNumber.col = getRandomNumber(n);

    let k = 0;
    for(let i = 0; i < n; ++i) {
        const newRow = table.insertRow();
        for(let j = 0; j < n; ++j) {
            const newCell = newRow.insertCell(j);
            if(i === hiddenNumber.row && j === hiddenNumber.col) {
                newCell.innerHTML = "";
                newCell.style.color = "black";

                hiddenNumber.val = randomNumbersArray[k];
            }
            else {
                newCell.innerHTML = `${randomNumbersArray[k]}`;
                newCell.style.color = `${getRandomColor()}`;
            }
            newCell.style.fontWeight = "bold";
            newCell.id = `row${i} col${j}`;
            ++k;
        }
    }

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

function arrowUpPressed(hiddenCellID, hiddenNumber) {
    if(hiddenNumber.row > 0) {
        const upCellID = `row${hiddenNumber.row - 1} col${hiddenNumber.col}`;
        interchangeCells(hiddenCellID, upCellID);

        --hiddenNumber.row;
    }
}

function arrowRightPressed(hiddenCellID, hiddenNumber, n) {
    if(hiddenNumber.col + 1 < n) {
        const upCellID = `row${hiddenNumber.row} col${hiddenNumber.col + 1}`;
        interchangeCells(hiddenCellID, upCellID);

        ++hiddenNumber.col;
    }
}

function arrowDownPressed(hiddenCellID, hiddenNumber, n) {
    if(hiddenNumber.row < n - 1) {
        const upCellID = `row${hiddenNumber.row + 1} col${hiddenNumber.col}`;
        interchangeCells(hiddenCellID, upCellID);

        ++hiddenNumber.row;
    }
}

function arrowLeftPressed(hiddenCellID, hiddenNumber) {
    if(hiddenNumber.col > 0) {
        const upCellID = `row${hiddenNumber.row} col${hiddenNumber.col - 1}`;
        interchangeCells(hiddenCellID, upCellID);

        --hiddenNumber.col;
    }
}

function gameFinished(n, hiddenNumber) {
    let prevValue = 0;
    for(let i = 0; i < n; ++i) {
        for(let j = 0; j < n; ++j) {
            let currentValue;

            if(i === hiddenNumber.row && j === hiddenNumber.col) {
                currentValue = hiddenNumber.val;
            }
            else {
                const currentCellID = `row${i} col${j}`;
                currentValue = document.getElementById(currentCellID).innerHTML;
            }

            if(prevValue > currentValue) {
                return false;
            }

            prevValue = currentValue;
        }
    }
    return true;
}

function updateNumberOfMoves(currentNumberOfMoves) {
    const numberOfMovesSpanElement = document.getElementById("no-of-moves");
    numberOfMovesSpanElement.innerHTML = `<u>Number of moves</u>: ${currentNumberOfMoves}`;
}

function displayCurrentGameStatus(hiddenNumber) {
    console.log(`NEW HIDDEN ROW: ${hiddenNumber.row}`);
    console.log(`NEW HIDDEN COL: ${hiddenNumber.col}`);
}

function startGame(n) {
    numberOfPassedSeconds = 0;
    updateSecondsCounter();
    const timer = setInterval(updateSecondsCounter, 1000);

    const mySet = createSet(n);
    const randomNumbersArray = createArray(mySet);

    let hiddenNumber = {val: undefined, row: undefined, col: undefined};
    computeGameTable(n, randomNumbersArray, hiddenNumber);

    if(gameFinished(n, hiddenNumber) === true) {
        alert("YOU WIN!");
        return;
    }

    let win = false;
    let numberOfMoves = 0;

    document.addEventListener('keydown', function(event) {
        if(!win) {
            const hiddenCellID = `row${hiddenNumber.row} col${hiddenNumber.col}`;

            let validMove = false;
            if(event.key === "ArrowUp" && hiddenNumber.row !== 0) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nUP arrow key pressed`);
                arrowUpPressed(hiddenCellID, hiddenNumber);

                validMove = true;
            }
            else if(event.key === "ArrowRight" && hiddenNumber.col < n - 1) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nRIGHT arrow key pressed`);
                arrowRightPressed(hiddenCellID, hiddenNumber, n);

                validMove = true;
            }
            else if(event.key === "ArrowDown" && hiddenNumber.row < n - 1) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nDOWN arrow key pressed`);
                arrowDownPressed(hiddenCellID, hiddenNumber, n);

                validMove = true;
            }
            else if(event.key === "ArrowLeft" && hiddenNumber.col !== 0) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nLEFT arrow key pressed`);
                arrowLeftPressed(hiddenCellID, hiddenNumber);

                validMove = true;
            }

            if(validMove) {
                updateNumberOfMoves(numberOfMoves);
                displayCurrentGameStatus(hiddenNumber);
            }

            if(gameFinished(n, hiddenNumber) === true) {
                clearInterval(timer);
                alert("YOU WIN!");
                win = true;
            }
        }
    });
}

function generateGame() {
    const gameSize = document.getElementById("table-size-input").value;
    startGame(gameSize);

    const generateGameButton = document.getElementById("generate-game-button");
    generateGameButton.disabled = true;
}