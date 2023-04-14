/*
Enunt:
O pagina HTML va contine un tabel cu n linii si n coloane.
Celulele tabelului contin numere de la 1 la n^2 intr-o ordine aleatoare.
Una dintre celule este libera.
Folosind JavaScript sa se creeze in cadrul paginii un joc de tip puzzle care la apasarea tastelor sageti va interschimba celula libera cu celula adiacenta (corespunzatoare tastei sus, jos, stanga, dreapta apasata).
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
 */

console.log("Welcome to script.js!");

function startGame(n) {
    const mySet = new Set();

    for(let i = 1; i <= n * n; ++i) {
        mySet.add(i);
    }

    function getRandomNumber(n) {
        return Math.floor(Math.random() * n);
    }

    const randomNumbersArray = [];

    while(mySet.size !== 0) {
        const setToArray = Array.from(mySet);
        const randomIndex = getRandomNumber(setToArray.length);
        const randomNumber = setToArray[randomIndex];
        randomNumbersArray.push(randomNumber);
        mySet.delete(randomNumber);
    }

    const table = document.getElementById("game-table");
    var hiddenNumber;
    var hiddenNumberRow = getRandomNumber(n);
    var hiddenNumberCol = getRandomNumber(n);
    var k = 0;

    for(let i = 0; i < n; ++i) {
        const newRow = table.insertRow();
        for(let j = 0; j < n; ++j) {
            const newCell = newRow.insertCell(j);
            if(i === hiddenNumberRow && j === hiddenNumberCol) {
                newCell.innerHTML = "";
                hiddenNumber = randomNumbersArray[k];
            }
            else {
                newCell.innerHTML = randomNumbersArray[k];
            }
            newCell.id = "row" + i + "col" + j;
            ++k;
        }
    }

    console.log("HIDDEN NUMBER: " + hiddenNumber);
    console.log("HIDDEN NUMBER ROW: " + hiddenNumberRow);
    console.log("HIDDEN NUMBER COL: " + hiddenNumberCol);

    if(gameFinished() === true) {
        alert("YOU WIN!");
        return;
    }

    function interchangeCells(firstCellID, secondCellID) {
        var firstCell = document.getElementById(firstCellID);
        var secondCell = document.getElementById(secondCellID);

        const aux = firstCell.innerHTML;
        firstCell.innerHTML = secondCell.innerHTML;
        secondCell.innerHTML = aux;
    }

    function arrowUpPressed(hiddenCellID) {
        if(hiddenNumberRow > 0) {
            const upCellID = "row" + (hiddenNumberRow - 1) + "col" + hiddenNumberCol;
            interchangeCells(hiddenCellID, upCellID);

            --hiddenNumberRow;
        }
    }

    function arrowRightPressed(hiddenCellID) {
        if(hiddenNumberCol + 1 < n) {
            const upCellID = "row" + hiddenNumberRow + "col" + (hiddenNumberCol + 1);
            interchangeCells(hiddenCellID, upCellID);

            ++hiddenNumberCol;
        }
    }

    function arrowDownPressed(hiddenCellID) {
        if(hiddenNumberRow < n - 1) {
            const upCellID = "row" + (hiddenNumberRow + 1) + "col" + hiddenNumberCol;
            interchangeCells(hiddenCellID, upCellID);

            ++hiddenNumberRow;
        }
    }

    function arrowLeftPressed(hiddenCellID) {
        if(hiddenNumberCol > 0) {
            const upCellID = "row" + hiddenNumberRow + "col" + (hiddenNumberCol - 1);
            interchangeCells(hiddenCellID, upCellID);

            --hiddenNumberCol;
        }
    }

    function gameFinished() {
        var prevValue = 0;
        for(let i = 0; i < n; ++i) {
            for(let j = 0; j < n; ++j) {
                var currentValue;

                if(i === hiddenNumberRow && j === hiddenNumberCol) {
                    currentValue = hiddenNumber;
                }
                else {
                    const currentCellID = "row" + i + "col" + j;
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

    var win = false;

    document.addEventListener('keydown', function(event) {
        if(!win) {
            const hiddenCellID = "row" + hiddenNumberRow + "col" + hiddenNumberCol;
            if(event.key === "ArrowUp") {
                console.log("UP arrow key pressed");
                arrowUpPressed(hiddenCellID);
            }
            else if(event.key === "ArrowRight") {
                console.log("RIGHT arrow key pressed");
                arrowRightPressed(hiddenCellID);
            }
            else if(event.key === "ArrowDown") {
                console.log("DOWN arrow key pressed");
                arrowDownPressed(hiddenCellID);
            }
            else if(event.key === "ArrowLeft") {
                console.log("LEFT arrow key pressed");
                arrowLeftPressed(hiddenCellID);
            }

            console.log("NEW HIDDEN ROW: " + hiddenNumberRow);
            console.log("NEW HIDDEN COL: " + hiddenNumberCol);

            if(gameFinished() === true) {
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