console.log("Joc de X si 0");

let canMove = false;
let turn;
let player;
let computer;
let timeout;
let freeCells = 9;
let end = false;

function randomMove() {
    return Math.floor(Math.random() * 3) + 1;
}

function gameIsOver() {
    const cell11 = document.querySelector("#cell11").textContent;
    const cell12 = document.querySelector("#cell12").textContent;
    const cell13 = document.querySelector("#cell13").textContent;

    const cell21 = document.querySelector("#cell21").textContent;
    const cell22 = document.querySelector("#cell22").textContent;
    const cell23 = document.querySelector("#cell23").textContent;

    const cell31 = document.querySelector("#cell31").textContent;
    const cell32 = document.querySelector("#cell32").textContent;
    const cell33 = document.querySelector("#cell33").textContent;

    // SAME ROW/LINE CHECK
    if (cell11 === cell12 && cell12 === cell13) {
        if (cell11 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell11 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell21 === cell22 && cell22 === cell23) {
        if (cell21 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell21 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell31 === cell32 && cell32 === cell33) {
        if (cell31 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell31 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    // DIAGONAL CHECK
    if (cell11 === cell22 && cell22 === cell33) {
        if (cell11 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell11 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell13 === cell22 && cell22 === cell31) {
        if (cell13 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell13 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    // SAME COLUMN CHECK
    if (cell11 === cell21 && cell21 === cell31) {
        if (cell11 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell11 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell12 === cell22 && cell22 === cell32) {
        if (cell12 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell12 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell13 === cell23 && cell23 === cell33) {
        if (cell13 === player) {
            alert("PLAYER WON!");
            return true;
        }
        else if (cell13 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (freeCells === 0) {
        alert("DRAW!");
        return true;
    }

    return false;
}

function validMove(row, col) {
    const cell = document.querySelector(`#cell${row}${col}`);
    if (cell.textContent === "-") {
        cell.textContent = computer;
        return true;
    }
    return false;
}

function computePlayerMove() {
    document.querySelector("#tic-tac-toe").addEventListener("click", (event) => {
        if (event.target.tagName === "TD") {
            if (event.target.textContent === "-" && end === false) {
                event.target.textContent = player;
                --freeCells;
                turn = 1;
            }
        }
    });
}

function checkGameStatus() {
    if (gameIsOver() === true) {
        end = true;
        clearTimeout(timeout);
    }
    else if (end === false) {
        console.log(`FREE CELLS: ${freeCells}`);

        if (turn === 0) {
            canMove = true;
            computePlayerMove();
        }
        else {
            canMove = false;

            let row = randomMove();
            let col = randomMove();

            while (!validMove(row, col)) {
                row = randomMove();
                col = randomMove();
            }

            console.log(`COMPUTER MOVE: ${row} ${col}`);

            --freeCells;
            turn = 0;
        }

        timeout = setTimeout(checkGameStatus, 500);
    }
}

function disableStartGameButton() {
    document.querySelector("button").disabled = true;
}

function disableRadioButtons() {
    const radioBtns = document.querySelectorAll(".radio-buttons");
    for (let i = 0; i < radioBtns.length; ++i) {
        radioBtns[i].disabled = true;
    }
}

function disableButtons() {
    disableStartGameButton();
    disableRadioButtons();
}

function showGameTable() {
    document.querySelector("table").style.display = "table";
}

function playerFirst() {
    canMove = true;
    turn = 0;
    player = "X";
    computer = "0";
}

function computerFirst() {
    canMove = false;
    turn = 1;
    player = "0";
    computer = "X";
}

function setPlayerAndComputer() {
    if (document.querySelector("#radio-button-1").checked === true) {
        playerFirst();
    }
    else if (document.querySelector("#radio-button-2").checked === true) {
        computerFirst();
    }
    else {
        (Math.floor(Math.random() * 2) === 0) ? (playerFirst()) : (computerFirst());
    }
}

function startGame() {
    setPlayerAndComputer();

    console.log(`PLAYER: ${player}`);
    console.log(`COMPUTER: ${computer}`);

    disableButtons();
    showGameTable();
    checkGameStatus();
}