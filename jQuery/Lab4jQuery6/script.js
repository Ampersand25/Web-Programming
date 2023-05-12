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

    $("#play-time").html(`<u>Total play time</u>: ${numberOfPassedSeconds}s`);
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function correctPosition(n, row, col, val) {
    return row * n + col + 1 === val;
}

function setInitialHiddenNumber(hiddenNumber, n) {
    hiddenNumber.row = n - 1;
    hiddenNumber.col = n - 1;
    hiddenNumber.val = n * n;
}

function computeInitialGameTable(table, n) {
    for(let i = 0; i < n; ++i) {
        const newRow = $("<tr>");
        table.append(newRow);

        for(let j = 0; j < n; ++j) {
            const newCell = $("<td>");
            newCell.css("font-weight", "bold");
            newCell.attr("id", `row${i}col${j}`);

            if(i !== n - 1 || j !== n - 1) {
                newCell.text(i * n + j + 1);
            }

            newRow.append(newCell);
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
        return undefined; // return move;
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

function updateColor(n, row, col) {
    const cellID = `row${row}col${col}`;
    const cell = $(`#${cellID}`);
    const val = cell.text();
    const color = (correctPosition(n, row, col, Number(val))) ? ("green") : ("red");
    cell.css("color", `${color}`);
}

function setCellsColor(table, n) {
    for(let row = 0; row < n; ++row) {
        for(let col = 0; col < n; ++col) {
            updateColor(n, row, col);
        }
    }
}

function computeGameTable(n, hiddenNumber, numberOfShuffles) {
    const table = $("#game-table");

    setInitialHiddenNumber(hiddenNumber, n);
    computeInitialGameTable(table, n);
    computeShuffledTable(table, hiddenNumber, n, numberOfShuffles);
    setCellsColor(table, n);

    displayInitialGameStatus(hiddenNumber);
}

function interchangeCells(firstCellID, secondCellID) {
    let firstCell = $(`#${firstCellID}`);
    let secondCell = $(`#${secondCellID}`);

    const auxInnerHTML = firstCell.html();
    firstCell.html(secondCell.html());
    secondCell.html(auxInnerHTML);

    const auxStyleColor = firstCell.css("color");
    firstCell.css("color", secondCell.css("color"));
    secondCell.css("color", auxStyleColor);
}

function arrowUpPressed(hiddenNumber, n) {
    if(hiddenNumber.row > 0) {
        const hiddenCellID = `row${hiddenNumber.row}col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row - 1}col${hiddenNumber.col}`;
        interchangeCells(hiddenCellID, upCellID);

        --hiddenNumber.row;
    }
}

function arrowRightPressed(hiddenNumber, n) {
    if(hiddenNumber.col + 1 < n) {
        const hiddenCellID = `row${hiddenNumber.row}col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row}col${hiddenNumber.col + 1}`;
        interchangeCells(hiddenCellID, upCellID);

        ++hiddenNumber.col;
    }
}

function arrowDownPressed(hiddenNumber, n) {
    if(hiddenNumber.row + 1 < n) {
        const hiddenCellID = `row${hiddenNumber.row}col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row + 1}col${hiddenNumber.col}`;
        interchangeCells(hiddenCellID, upCellID);

        ++hiddenNumber.row;
    }
}

function arrowLeftPressed(hiddenNumber, n) {
    if(hiddenNumber.col > 0) {
        const hiddenCellID = `row${hiddenNumber.row}col${hiddenNumber.col}`;
        const upCellID = `row${hiddenNumber.row}col${hiddenNumber.col - 1}`;
        interchangeCells(hiddenCellID, upCellID);

        --hiddenNumber.col;
    }
}

function getNumberFromTable(r, c) {
    return $(`#row${r}col${c}`).text();
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
    $("#no-of-moves").html(`<u>Number of moves</u>: ${currentNumberOfMoves}`);
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

    $(document).keydown((event) => {
        if(!win) {
            const r = hiddenNumber.row;
            const c = hiddenNumber.col;
            let validMove = true;
            if((event.key === "ArrowUp" || event.key.toLocaleLowerCase() === "w") && hiddenNumber.row !== 0) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nUP arrow key pressed`);
                arrowUpPressed(hiddenNumber, n);
            }
            else if((event.key === "ArrowRight" || event.key.toLocaleLowerCase() === "d") && hiddenNumber.col < n - 1) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nRIGHT arrow key pressed`);
                arrowRightPressed(hiddenNumber, n);
            }
            else if((event.key === "ArrowDown" || event.key.toLocaleLowerCase() === "s") && hiddenNumber.row < n - 1) {
                console.log("\n");
                console.log(`Move #${++numberOfMoves}\nDOWN arrow key pressed`);
                arrowDownPressed(hiddenNumber, n);
            }
            else if((event.key === "ArrowLeft" || event.key.toLocaleLowerCase() === "a") && hiddenNumber.col !== 0) {
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
                updateColor(n, r, c);
            }

            if(gameFinished(n, hiddenNumber)) {
                winHandler(timer);
                win = true;
            }
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

$("document").ready(() => {
    $("#generate-game-button").click(() => {
        createGame($("#table-size-input").val(), $("#number-of-shuffles-input").val());
        $("#generate-game-button").prop("disabled", true);
    });
});