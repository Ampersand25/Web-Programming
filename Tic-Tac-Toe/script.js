console.log("Joc de X si 0");

let turn;
let player;
let computer;
let timeout;
let freeCells = 9;
let end = false;

const jsConfetti = new JSConfetti();

function startConfetti() {
    jsConfetti.addConfetti();
}

function winHandler() {
    setInterval(startConfetti, 500);
    alert("PLAYER WON!");
}

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
            winHandler();
            return true;
        }
        else if (cell11 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell21 === cell22 && cell22 === cell23) {
        if (cell21 === player) {
            winHandler();
            return true;
        }
        else if (cell21 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell31 === cell32 && cell32 === cell33) {
        if (cell31 === player) {
            winHandler();
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
            winHandler();
            return true;
        }
        else if (cell11 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell13 === cell22 && cell22 === cell31) {
        if (cell13 === player) {
            winHandler();
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
            winHandler();
            return true;
        }
        else if (cell11 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell12 === cell22 && cell22 === cell32) {
        if (cell12 === player) {
            winHandler();
            return true;
        }
        else if (cell12 === computer) {
            alert("COMPUTER WON!");
            return true;
        }
    }

    if (cell13 === cell23 && cell23 === cell33) {
        if (cell13 === player) {
            winHandler();
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

function computeSmartMove(symbol) {
    const cell11 = document.querySelector("#cell11");
    const cell12 = document.querySelector("#cell12");
    const cell13 = document.querySelector("#cell13");

    const cell21 = document.querySelector("#cell21");
    const cell22 = document.querySelector("#cell22");
    const cell23 = document.querySelector("#cell23");

    const cell31 = document.querySelector("#cell31");
    const cell32 = document.querySelector("#cell32");
    const cell33 = document.querySelector("#cell33");

    // ROWS/LINES CHECK
    // FIRST ROW/LINE
    if (cell11.textContent === cell12.textContent && cell11.textContent === symbol && cell13.textContent === "-") {
        cell13.textContent = computer;
        return true;
    }

    if (cell11.textContent === cell13.textContent && cell11.textContent === symbol && cell12.textContent === "-") {
        cell12.textContent = computer;
        return true;
    }

    if (cell12.textContent === cell13.textContent && cell12.textContent === symbol && cell11.textContent === "-") {
        cell11.textContent = computer;
        return true;
    }

    // SECOND ROW/LINE
    if (cell21.textContent === cell22.textContent && cell21.textContent === symbol && cell23.textContent === "-") {
        cell23.textContent = computer;
        return true;
    }

    if (cell21.textContent === cell23.textContent && cell21.textContent === symbol && cell22.textContent === "-") {
        cell22.textContent = computer;
        return true;
    }

    if (cell22.textContent === cell23.textContent && cell22.textContent === symbol && cell21.textContent === "-") {
        cell21.textContent = computer;
        return true;
    }

    // THIRD ROW/LINE
    if (cell31.textContent === cell32.textContent && cell31.textContent === symbol && cell33.textContent === "-") {
        cell33.textContent = computer;
        return true;
    }

    if (cell31.textContent === cell33.textContent && cell31.textContent === symbol && cell32.textContent === "-") {
        cell32.textContent = computer;
        return true;
    }

    if (cell32.textContent === cell33.textContent && cell32.textContent === symbol && cell31.textContent === "-") {
        cell31.textContent = computer;
        return true;
    }

    // DIAGONALS CHECK
    // FIRST DIAGONAL CHECK
    if (cell11.textContent === cell22.textContent && cell11.textContent === symbol && cell33.textContent === "-") {
        cell33.textContent = computer;
        return true;
    }

    if (cell11.textContent === cell33.textContent && cell11.textContent === symbol && cell22.textContent === "-") {
        cell22.textContent = computer;
        return true;
    }

    if (cell22.textContent === cell33.textContent && cell22.textContent === symbol && cell11.textContent === "-") {
        cell11.textContent = computer;
        return true;
    }

    // SECOND DIAGONAL CHECK
    if (cell13.textContent === cell22.textContent && cell13.textContent === symbol && cell31.textContent === "-") {
        cell31.textContent = computer;
        return true;
    }

    if (cell13.textContent === cell31.textContent && cell13.textContent === symbol && cell22.textContent === "-") {
        cell22.textContent = computer;
        return true;
    }

    if (cell22.textContent === cell31.textContent && cell22.textContent === symbol && cell13.textContent === "-") {
        cell13.textContent = computer;
        return true;
    }

    // COLUMNS CHECK
    // FIRST COLUMN CHECK
    if (cell11.textContent === cell21.textContent && cell11.textContent === symbol && cell31.textContent === "-") {
        cell31.textContent = computer;
        return true;
    }

    if (cell11.textContent === cell31.textContent && cell11.textContent === symbol && cell21.textContent === "-") {
        cell21.textContent = computer;
        return true;
    }

    if (cell21.textContent === cell31.textContent && cell21.textContent === symbol && cell11.textContent === "-") {
        cell11.textContent = computer;
        return true;
    }

    // SECOND COLUMN CHECK
    if (cell12.textContent === cell22.textContent && cell12.textContent === symbol && cell32.textContent === "-") {
        cell32.textContent = computer;
        return true;
    }

    if (cell12.textContent === cell32.textContent && cell12.textContent === symbol && cell22.textContent === "-") {
        cell22.textContent = computer;
        return true;
    }

    if (cell22.textContent === cell32.textContent && cell22.textContent === symbol && cell12.textContent === "-") {
        cell12.textContent = computer;
        return true;
    }

    // THIRD COLUMN CHECK
    if (cell13.textContent === cell23.textContent && cell13.textContent === symbol && cell33.textContent === "-") {
        cell33.textContent = computer;
        return true;
    }

    if (cell13.textContent === cell33.textContent && cell13.textContent === symbol && cell23.textContent === "-") {
        cell23.textContent = computer;
        return true;
    }

    if (cell23.textContent === cell33.textContent && cell23.textContent === symbol && cell13.textContent === "-") {
        cell13.textContent = computer;
        return true;
    }

    return false;
}

function computeSmartMoveWrapper() {
    return computeSmartMove(computer) || computeSmartMove(player);
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
    else if (!end) {
        console.log(`FREE CELLS: ${freeCells}`);

        if (turn === 0) {
            computePlayerMove();
        }
        else {
            if (!computeSmartMoveWrapper(computer)) {
                let row = randomMove();
                let col = randomMove();

                while (!validMove(row, col)) {
                    row = randomMove();
                    col = randomMove();
                }
            }

            --freeCells;
            turn = 0;
        }

        timeout = setTimeout(checkGameStatus, 100);
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
    turn = 0;
    player = "X";
    computer = "0";
}

function computerFirst() {
    turn = 1;
    player = "0";
    computer = "X";
}

function setPlayerAndComputer() {
    if (document.querySelector("#radio-button-1").checked) {
        playerFirst();
    }
    else if (document.querySelector("#radio-button-2").checked) {
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