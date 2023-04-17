/*
Enunt:
Sa se implementeze folosind JavaScript urmatoarea problema.
O matrice cu numar par de elemente, reprezentata vizual sub forma unui tabel, contine perechi de numere initial ascunse.
Daca utilizatorul da click pe doua celule ale tabelului ce contin numere egale acestea vor fi afisate si vor ramane afisate.
Daca numerele continute in cele doua celule nu sunt egale, vor fi ascunse din nou dupa un numar de 2, 3 secunde.
Jocul se termina cand toate perechile de numere au fost ghicite.
Dupa prima implementare a jocului, se va crea o noua versiune in care numerele vor fi inlocuite cu imagini (ce contin fructe spre exemplu, sau “profi” de pe pagina facultatii).
Problema mai este recunoscuta si sub numele de Memory Game.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

function startTimer() {
    const startTime = new Date().getTime();
    const timerLabel = document.getElementById("timer-label");

    return setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);

        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;

        timerLabel.textContent = `Total play time: ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }, 1000);
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0; i < 6; ++i) {
        color += letters[getRandomNumber(16)];
    }
    return color;
}

function populateArrays(n, numbers, colors) {
    for(let i = 1; i <= n * n / 2; ++i) {
        numbers.push(i);
        numbers.push(i);

        colors.push(getRandomColor());
    }
}

function deleteElement(arr, index) {
    if(index !== -1) {
        arr.splice(index, 1);
    }
}

function getRandomNumbersArray(numbers) {
    const randomNumbersArray = [];
    while(numbers.length !== 0) {
        const randomIndex = getRandomNumber(numbers.length);
        const randomNumber = numbers[randomIndex];
        randomNumbersArray.push(randomNumber);
        deleteElement(numbers, randomIndex);
    }
    return randomNumbersArray;
}

function computeGameTable(n, randomNumbersArray, matrix, visibleMatrix) {
    const table = document.getElementById("game-table");
    let currentElemIndex = 0;

    for(let r = 0; r < n; ++r) {
        const row = [];
        const visibleMatrixRow = [];

        const newRow = table.insertRow();
        for(let c = 0; c < n; ++c) {
            row.push(randomNumbersArray[currentElemIndex++]);
            visibleMatrixRow.push(false);

            const newCell = newRow.insertCell(c);
            newCell.id = `row${r}col${c}`;
            newCell.innerHTML = "&zwnj;";
            newCell.style.backgroundColor = "white";
            newCell.style.color = "black";
        }

        matrix.push(row);
        visibleMatrix.push(visibleMatrixRow)
    }

    return table;
}

function hideCell(r, c) {
    const cellID = `row${r}col${c}`;
    const cell = document.getElementById(cellID);
    cell.innerHTML = "&zwnj;";
    cell.style.backgroundColor = "white";
    cell.style.color = "black";
}

function updateNumberOfMoves(numberOfMoves) {
    const numberOfMovesLabel = document.getElementById("moves-label");
    numberOfMovesLabel.textContent = `Total number of moves: ${++numberOfMoves}`;
    return numberOfMoves;
}

function startGame(n, numberOfSeconds) {
    const timer = startTimer();

    const numbers = [];
    const colors = ["#FFFFFF"];
    populateArrays(n, numbers, colors);

    const randomNumbersArray = getRandomNumbersArray(numbers);

    const matrix = [];
    const visibleMatrix = [];
    const table = computeGameTable(n, randomNumbersArray, matrix, visibleMatrix);

    let firstCellClickedVal = -1;
    let firstCellClickedRow = -1;
    let firstCellClickedCol = -1;

    let secondCellClickedVal = -1;
    let secondCellClickedRow = -1;
    let secondCellClickedCol = -1;

    let hiddenElements = n * n;
    let win = false;
    let blocked = false;
    let numberOfMoves = 0;

    table.addEventListener("click", function(event) {
        if(blocked) {
            return;
        }

        if(win === false) {
            const cell = event.target;

            if(cell.tagName === "TD") {
                let validMove = false;

                const row = cell.parentNode;
                const rowIndex = row.rowIndex;
                const colIndex = cell.cellIndex;

                const clickedCellID = `row${rowIndex}col${colIndex}`;
                const clickedCell = document.getElementById(clickedCellID);
                const clickedElement = matrix[rowIndex][colIndex];
                clickedCell.innerHTML = clickedElement;
                clickedCell.style.backgroundColor = colors[matrix[rowIndex][colIndex]];
                clickedCell.style.color = "white";

                if(firstCellClickedVal === -1) {
                    if(!visibleMatrix[rowIndex][colIndex]) {
                        firstCellClickedVal = clickedElement;
                        firstCellClickedRow = rowIndex;
                        firstCellClickedCol = colIndex;

                        validMove = true;
                    }
                }
                else if(!visibleMatrix[rowIndex][colIndex]) {
                    if(firstCellClickedRow === rowIndex && firstCellClickedCol === colIndex) {
                        return;
                    }

                    secondCellClickedVal = clickedElement;
                    secondCellClickedRow = rowIndex;
                    secondCellClickedCol = colIndex;

                    console.clear();
                    console.log("First cell clicked value: " + firstCellClickedVal);
                    console.log("Second cell clicked value: " + secondCellClickedVal);

                    if(firstCellClickedVal === secondCellClickedVal) {
                        if (firstCellClickedRow !== secondCellClickedRow || firstCellClickedCol !== secondCellClickedCol) {
                            console.log("MATCH");
                            hiddenElements -= 2;

                            visibleMatrix[firstCellClickedRow][firstCellClickedCol] = true;
                            visibleMatrix[secondCellClickedRow][secondCellClickedCol] = true;

                            validMove = true;
                        }
                        else {
                            console.log("SAME");

                            blocked = true;
                            setTimeout(function() {
                                hideCell(firstCellClickedRow, firstCellClickedCol);
                                blocked = false;
                            }, numberOfSeconds * 1000);
                        }
                    }
                    else {
                        console.log("NO MATCH");

                        blocked = true;
                        setTimeout(function() {
                            hideCell(firstCellClickedRow, firstCellClickedCol);
                            hideCell(secondCellClickedRow, secondCellClickedCol);
                            blocked = false;
                        }, numberOfSeconds * 1000);

                        validMove = true;
                    }

                    firstCellClickedVal = -1;
                    secondCellClickedVal = -1;
                }

                if(validMove) {
                    numberOfMoves = updateNumberOfMoves(numberOfMoves);
                }
            }
        }

        if(hiddenElements === 0 && win === false) {
            clearInterval(timer);

            alert("YOU WIN!");
            win = true;
        }
    });
}

function generateGame() {
    const gameSize = document.getElementById("table-size-input").value;
    const numberOfSeconds = document.getElementById("number-of-seconds-input").value;
    startGame(gameSize, numberOfSeconds);

    const generateGameButton = document.getElementById("generate-game-button");
    generateGameButton.disabled = true;
}