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
    const imageData = [
        { src: "./Images/image0.png", alt: "Image 0" },
        { src: "./Images/image1.png", alt: "Image 1" },
        { src: "./Images/image2.png", alt: "Image 2" },
        { src: "./Images/image3.png", alt: "Image 3" },
        { src: "./Images/image4.png", alt: "Image 4" },
        { src: "./Images/image5.png", alt: "Image 5" },
        { src: "./Images/image6.png", alt: "Image 6" },
        { src: "./Images/image7.png", alt: "Image 7" },
        { src: "./Images/image8.png", alt: "Image 8" },
        { src: "./Images/image9.png", alt: "Image 9" },
        { src: "./Images/image10.png", alt: "Image 10" },
        { src: "./Images/image11.png", alt: "Image 11" },
        { src: "./Images/image12.png", alt: "Image 12" },
        { src: "./Images/image13.png", alt: "Image 13" },
        { src: "./Images/image14.png", alt: "Image 14" },
        { src: "./Images/image15.png", alt: "Image 15" },
        { src: "./Images/image16.png", alt: "Image 16" },
        { src: "./Images/image17.png", alt: "Image 17" },
        { src: "./Images/image18.png", alt: "Image 18" }
    ];

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

    for(let i = 1; i <= n * n / 2; ++i) {
        numbers.push(i);
        numbers.push(i);
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
    var visibleMatrix = [];
    var currentElemIndex = 0;

    for(let r = 0; r < n; ++r) {
        var row = [];
        var visibleMatrixRow = [];

        const newRow = table.insertRow();
        for(let c = 0; c < n; ++c) {
            const randomNumber = randomNumbersArray[currentElemIndex];
            row.push(randomNumber);
            visibleMatrixRow.push(false);

            const newCell = newRow.insertCell(c);
            newCell.id = "row" + r + "col" + c;
            newCell.innerHTML = `<img src="${imageData[0].src}" alt="${imageData[0].alt}" width="50" height="50">`;

            ++currentElemIndex;
        }

        matrix.push(row);
        visibleMatrix.push(visibleMatrixRow);
    }

    console.log(matrix);

    function hideCell(r, c) {
        const cellID = "row" + r + "col" + c;
        const cell = document.getElementById(cellID);
        cell.innerHTML = `<img src="${imageData[0].src}" alt="${imageData[0].alt}" width="50" height="50">`;
    }

    var firstCellClickedVal = false;
    var firstCellClickedRow = -1;
    var firstCellClickedCol = -1;

    var secondCellClickedVal = false;
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
            var rowIndex = undefined;
            var colIndex = undefined;

            if(cell.tagName === "IMG") {
                const tableCell = cell.closest('td');

                const row = tableCell.parentNode;
                rowIndex = row.rowIndex;
                colIndex = tableCell.cellIndex;
            }

            if(cell.tagName === "TD") {
                const row = cell.parentNode;
                rowIndex = row.rowIndex;
                colIndex = cell.cellIndex;
            }

            if(cell.tagName === "IMG" || cell.tagName === "TD") {
                const clickedCellID = "row" + rowIndex + "col" + colIndex;
                const clickedCell = document.getElementById(clickedCellID);
                const clickedImageIndex = matrix[rowIndex][colIndex];
                clickedCell.innerHTML = `<img src="${imageData[clickedImageIndex].src}" alt="${imageData[clickedImageIndex].alt}" width="50" height="50">`;

                if(firstCellClickedVal === false) {
                    if(!visibleMatrix[rowIndex][colIndex]) {
                        firstCellClickedVal = imageData[clickedImageIndex].src;
                        firstCellClickedRow = rowIndex;
                        firstCellClickedCol = colIndex;
                    }
                }
                else if(!visibleMatrix[rowIndex][colIndex]) {
                    secondCellClickedVal = imageData[clickedImageIndex].src;
                    secondCellClickedRow = rowIndex;
                    secondCellClickedCol = colIndex;

                    console.clear();
                    console.log("First cell clicked value: " + firstCellClickedVal);
                    console.log("Second cell clicked value: " + secondCellClickedVal);

                    if(firstCellClickedVal === secondCellClickedVal) {
                        if (firstCellClickedRow !== secondCellClickedRow || firstCellClickedCol !== secondCellClickedCol) {
                            console.log("MATCH");

                            hiddenElements -= 2;
                            visibleMatrix[firstCellClickedRow][firstCellClickedCol] = visibleMatrix[secondCellClickedRow][secondCellClickedCol] = true;
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
                    }

                    firstCellClickedVal = secondCellClickedVal = false;
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
    const numberOfSeconds = document.getElementById("number-of-seconds-input").value;
    startGame(6, numberOfSeconds);

    const generateGameButton = document.getElementById("generate-game-button");
    generateGameButton.disabled = true;
}