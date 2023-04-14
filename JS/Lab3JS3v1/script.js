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

function startGame(n, numberOfSeconds) {
    function getRandomNumber(n) {
        return Math.floor(Math.random() * n);
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        var color = "#";
        for(let i = 0; i < 6; ++i) {
            color += letters[getRandomNumber(16)];
        }
        return color;
    }

    const numbers = [];
    var colors = ["#FFFFFF"];

    for(let i = 1; i <= n * n / 2; ++i) {
        numbers.push(i);
        numbers.push(i);

        colors.push(getRandomColor());
    }

    function deleteElement(arr, index) {
        if(index !== -1) {
            arr.splice(index, 1);
        }
    }

    const randomNumbersArray = [];

    while(numbers.length !== 0) {
        const randomIndex = getRandomNumber(numbers.length);
        const randomNumber = numbers[randomIndex];
        randomNumbersArray.push(randomNumber);
        deleteElement(numbers, randomIndex);
    }

    const table = document.getElementById("game-table");
    var matrix = [];
    var currentElemIndex = 0;

    for(let r = 0; r < n; ++r) {
        var row = [];

        const newRow = table.insertRow();
        for(let c = 0; c < n; ++c) {
            row.push(randomNumbersArray[currentElemIndex++]);

            const newCell = newRow.insertCell(c);
            newCell.id = "row" + r + "col" + c;
            newCell.innerHTML = "&zwnj;";
            newCell.style.backgroundColor = "white";
            newCell.style.color = "black";
        }

        matrix.push(row);
    }

    console.log(matrix);

    function hideCell(r, c) {
        const cellID = "row" + r + "col" + c;
        const cell = document.getElementById(cellID);
        cell.innerHTML = "&zwnj;";
        cell.style.backgroundColor = "white";
        cell.style.color = "black";
    }

    var firstCellClickedVal = -1;
    var firstCellClickedRow = -1;
    var firstCellClickedCol = -1;

    var secondCellClickedVal = -1;
    var secondCellClickedRow = -1;
    var secondCellClickedCol = -1;

    var hiddenElements = n * n;
    var win = false;
    var blocked = false;

    table.addEventListener("click", function(event) {
        if(blocked) {
            return;
        }

        if(win === false) {
            const cell = event.target;

            if(cell.tagName === "TD") {
                const row = cell.parentNode;
                const rowIndex = row.rowIndex;
                const colIndex = cell.cellIndex;

                const clickedCellID = "row" + rowIndex + "col" + colIndex;
                const clickedCell = document.getElementById(clickedCellID);
                const clickedElement = matrix[rowIndex][colIndex];
                clickedCell.innerHTML = clickedElement;
                clickedCell.style.backgroundColor = colors[matrix[rowIndex][colIndex]];
                clickedCell.style.color = "white";

                if(firstCellClickedVal === -1) {
                    firstCellClickedVal = clickedElement;
                    firstCellClickedRow = rowIndex;
                    firstCellClickedCol = colIndex;
                }
                else {
                    secondCellClickedVal = clickedElement;
                    secondCellClickedRow = rowIndex;
                    secondCellClickedCol = colIndex;

                    console.clear();
                    console.log("First cell clicked value: " + firstCellClickedVal);
                    console.log("Second cell clicked value: " + secondCellClickedVal);

                    if(firstCellClickedVal === secondCellClickedVal) {
                        console.log("MATCH");
                        hiddenElements -= 2;
                    }
                    else {
                        console.log("NO MATCH");

                        blocked = true;
                        setTimeout(function() {
                            hideCell(firstCellClickedRow, firstCellClickedCol);
                            hideCell(secondCellClickedRow, secondCellClickedCol);
                            blocked = false;
                        }, numberOfSeconds * 1000);
                    }

                    firstCellClickedVal = secondCellClickedVal = -1;
                }
            }
        }

        if(hiddenElements === 0 && win === false) {
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