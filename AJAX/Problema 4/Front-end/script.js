// Sa se scrie o pagina HTML care contine un tabel de 3×3 care reprezinta o tabla de X-0.
// Aleator va incepe sa joace fie calculatorul fie jucatorul.
// La un click intr-o casuta a tabelului acesta se va completa cu X sau 0 in funtie daca a inceput sau nu jucatorul uman.
// Dupa actiunea jucatorului se va apela prin AJAX un script server side care face urmatoarea mutare.
// Tot server side se va face verificarea terminarii jocului.

console.log("Problema 4 AJAX - Laborator 5 Programare Web");

const jsConfetti = new JSConfetti();

let turn;
let player;
let computer;
let timeout;
let end = false;

function randomMove() {
    return Math.floor(Math.random() * 3) + 1;
}

function gameIsOver() {
    if (end === true) {
        return;
    }

    const cell11 = document.querySelector("#cell11").textContent;
    const cell12 = document.querySelector("#cell12").textContent;
    const cell13 = document.querySelector("#cell13").textContent;

    const cell21 = document.querySelector("#cell21").textContent;
    const cell22 = document.querySelector("#cell22").textContent;
    const cell23 = document.querySelector("#cell23").textContent;

    const cell31 = document.querySelector("#cell31").textContent;
    const cell32 = document.querySelector("#cell32").textContent;
    const cell33 = document.querySelector("#cell33").textContent;

    const data = [cell11, cell12, cell13, cell21, cell22, cell23, cell31, cell32, cell33, player, computer];
    const jsonData = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Lab5AJAX/Problema4/pb4_1.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            if (xhr.responseText === "draw") {
                alert("DRAW");
                end = true;

                const draws = localStorage.getItem("remize");
                localStorage.setItem("remize", (draws === null) ? (0) : (parseInt(draws) + 1));
                updateStats();
            }
            else if (xhr.responseText === "player") {
                jsConfetti.addConfetti({
                    emojis: ['🦄', '🌈', '⚡️', '💥', '✨', '💫', '🌸'],
                }).then(() => { alert("PLAYER WON!"); });

                end = true;

                const victories = localStorage.getItem("victorii-jucator");
                localStorage.setItem("victorii-jucator", (victories === null) ? (0) : (parseInt(victories) + 1));
                updateStats();
            }
            else if (xhr.responseText === "computer") {
                alert("COMPUTER WON");
                end = true;

                const loses = localStorage.getItem("victorii-calculator");
                localStorage.setItem("victorii-calculator", (loses === null) ? (0) : (parseInt(loses) + 1));
                updateStats();
            }
        }
    };

    xhr.send(jsonData);
}

function computeComputerMove() {
    const cell11 = document.querySelector("#cell11").textContent;
    const cell12 = document.querySelector("#cell12").textContent;
    const cell13 = document.querySelector("#cell13").textContent;

    const cell21 = document.querySelector("#cell21").textContent;
    const cell22 = document.querySelector("#cell22").textContent;
    const cell23 = document.querySelector("#cell23").textContent;

    const cell31 = document.querySelector("#cell31").textContent;
    const cell32 = document.querySelector("#cell32").textContent;
    const cell33 = document.querySelector("#cell33").textContent;

    const data = [cell11, cell12, cell13, cell21, cell22, cell23, cell31, cell32, cell33];
    const jsonData = JSON.stringify(data);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/Lab5AJAX/Problema4/pb4_2.php", false);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = xhr.responseText;
            const row = response[0];
            const col = response[1];

            console.log(`TEST: ${row} ${col}`);

            document.querySelector(`#cell${row}${col}`).textContent = computer;

            turn = 0;
        }
    };

    xhr.send(jsonData);
}

function computePlayerMove() {
    const table = document.querySelector("#tic-tac-toe");
    table.addEventListener("click", (event) => {
        if (event.target.tagName === "TD") {
            if (event.target.textContent === "-" && end === false) {
                turn = 1;
                event.target.textContent = player;
            }
        }
    });
}

function checkGameStatus() {
    if (end === false) {
        gameIsOver();
    }

    if (end === true) {
        clearTimeout(timeout);
    }
    else {
        if (turn === 0) {
            computePlayerMove();
        }
        else {
            computeComputerMove();
        }

        timeout = setTimeout(checkGameStatus, 1);
    }
}

function disableStartGameButton() {
    const btn = document.querySelector("button");
    btn.disabled = true;
}

function disableRadioButtons() {
    const radioBtns = document.querySelectorAll(".radio-buttons");
    for (let i = 0; i < radioBtns.length; ++i) {
        const radioBtn = radioBtns[i];
        radioBtn.disabled = true;
    }
}

function disableButtons() {
    disableStartGameButton();
    disableRadioButtons();
}

function showGameTable() {
    const gameTable = document.querySelector("table");
    gameTable.style.display = "table";
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
    if (document.querySelector("#radio-button-1").checked === true) {
        playerFirst();
    }
    else if (document.querySelector("#radio-button-2").checked === true) {
        computerFirst();
    }
    else {
        const randomNumber = Math.floor(Math.random() * 2);
        (randomNumber === 0) ? (playerFirst()) : (computerFirst());
    }
}

function updateStats() {
    const statsPlayer = document.querySelector("#victorii-jucator");
    const victories = (localStorage.getItem("victorii-jucator") === null) ? (0) : (parseInt(localStorage.getItem("victorii-jucator")));
    statsPlayer.textContent = `Numar total de victorii jucator: ${victories}`;

    const statsComputer = document.querySelector("#victorii-calculator");
    const loses = (localStorage.getItem("victorii-calculator") === null) ? (0) : (parseInt(localStorage.getItem("victorii-calculator")));
    statsComputer.textContent = `Numar total de victorii calculator: ${loses}`;

    const statsDraws = document.querySelector("#remize");
    const draws = (localStorage.getItem("remize") === null) ? (0) : (parseInt(localStorage.getItem("remize")));
    statsDraws.textContent = `Numar total de remize: ${draws}`;
}

function startGame() {
    updateStats();

    setPlayerAndComputer();

    console.log(`PLAYER: ${player}`);
    console.log(`COMPUTER: ${computer}`);

    disableButtons();
    showGameTable();
    checkGameStatus();
}