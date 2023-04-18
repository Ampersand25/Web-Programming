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

let timeCount;

function getBestScore() {
    const storedBestScore = localStorage.getItem("bestScore");
    const minimumMovesLabel = document.getElementById("minimum-moves");

    let score = "-";
    if(storedBestScore !== null) {
        score = `${storedBestScore}`;
    }
    minimumMovesLabel.innerHTML = `<em>Best Score</em>: <strong>${score}</strong>`;

    return storedBestScore;
}

function setBestScore(newBestScore) {
    localStorage.setItem("bestScore", newBestScore);
}

function getBestTime() {
    const storedBestTime = localStorage.getItem("bestTime");
    const bestTimeLabel = document.getElementById("best-time");
    let time = "-";
    if(storedBestTime !== null) {
        const hours = Math.floor(storedBestTime / 3600);
        const minutes = Math.floor((storedBestTime % 3600) / 60);
        const seconds = storedBestTime % 60;

        const hoursStr = (hours < 10) ? (`0${hours}`) : (hours);
        const minutesStr = (minutes < 10) ? (`0${minutes}`) : (minutes);
        const secondsStr = (seconds < 10) ? (`0${seconds}`) : (seconds);

        time = `${hoursStr}:${minutesStr}:${secondsStr}`;
    }
    bestTimeLabel.innerHTML = `<em>Best Time</em>: <strong>${time}</strong>`;
    return storedBestTime;
}

function setBestTime(newBestTime) {
    localStorage.setItem("bestTime", newBestTime);
}

function startTimer() {
    const startTime = new Date().getTime();
    const timeLabel = document.getElementById("time-label");

    return setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);

        timeCount = elapsedTime;

        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;

        const hoursStr = (hours < 10) ? (`0${hours}`) : (hours);
        const minutesStr = (minutes < 10) ? (`0${minutes}`) : (minutes);
        const secondsStr = (seconds < 10) ? (`0${seconds}`) : (seconds);

        timeLabel.innerHTML = `<em>Time</em>: <strong>${hoursStr}:${minutesStr}:${secondsStr}</strong>`;
    }, 1000);
}

function getImageData(imageFolder) {
    return [
        { src: `./Images/${imageFolder}/image0.png`, alt: "Image 0" },
        { src: `./Images/${imageFolder}/image1.png`, alt: "Image 1" },
        { src: `./Images/${imageFolder}/image2.png`, alt: "Image 2" },
        { src: `./Images/${imageFolder}/image3.png`, alt: "Image 3" },
        { src: `./Images/${imageFolder}/image4.png`, alt: "Image 4" },
        { src: `./Images/${imageFolder}/image5.png`, alt: "Image 5" },
        { src: `./Images/${imageFolder}/image6.png`, alt: "Image 6" },
        { src: `./Images/${imageFolder}/image7.png`, alt: "Image 7" },
        { src: `./Images/${imageFolder}/image8.png`, alt: "Image 8" },
        { src: `./Images/${imageFolder}/image9.png`, alt: "Image 9" },
        { src: `./Images/${imageFolder}/image10.png`, alt: "Image 10" },
        { src: `./Images/${imageFolder}/image11.png`, alt: "Image 11" },
        { src: `./Images/${imageFolder}/image12.png`, alt: "Image 12" },
        { src: `./Images/${imageFolder}/image13.png`, alt: "Image 13" },
        { src: `./Images/${imageFolder}/image14.png`, alt: "Image 14" },
        { src: `./Images/${imageFolder}/image15.png`, alt: "Image 15" },
        { src: `./Images/${imageFolder}/image16.png`, alt: "Image 16" },
        { src: `./Images/${imageFolder}/image17.png`, alt: "Image 17" },
        { src: `./Images/${imageFolder}/image18.png`, alt: "Image 18" }
    ];
}

function getRandomNumber(n) {
    return Math.floor(Math.random() * n);
}

function getNumbers(n) {
    const numbers = [];
    const numberOfCards = n * n / 2;
    for(let i = 1; i <= numberOfCards; ++i) {
        numbers.push(i);
        numbers.push(i);
    }
    return numbers;
}

function deleteElement(arr, index) {
    if(index !== -1) {
        arr.splice(index, 1);
    }
    else {
        console.error(`Index (${index}) out of range!`);
    }
}

function getRandomNumbers(numbers) {
    const randomNumbersArray = [];
    while(numbers.length !== 0) {
        const randomIndex = getRandomNumber(numbers.length);
        const randomNumber = numbers[randomIndex];
        randomNumbersArray.push(randomNumber);
        deleteElement(numbers, randomIndex);
    }
    return randomNumbersArray;
}

function computeGameTable(n, randomNumbersArray, imageData, matrix, visibleMatrix) {
    const table = document.getElementById("game-table");
    let currentElemIndex = 0;

    for(let r = 0; r < n; ++r) {
        const row = [];
        const visibleMatrixRow = [];

        const newRow = table.insertRow();
        for(let c = 0; c < n; ++c) {
            const randomNumber = randomNumbersArray[currentElemIndex];
            row.push(randomNumber);
            visibleMatrixRow.push(false);

            const newCell = newRow.insertCell(c);
            newCell.id = `row${r}col${c}`;
            newCell.innerHTML = `<img id="image${r},${c}" src="${imageData[0].src}" alt="${imageData[0].alt}" width="50" height="50">`;

            ++currentElemIndex;
        }

        matrix.push(row);
        visibleMatrix.push(visibleMatrixRow);
    }

    return table;
}

function changeImage(r, c, newSrc, newAlt) {
    const image = document.getElementById(`image${r},${c}`);
    image.src = `${newSrc}`;
    image.alt = `${newAlt}`;
}

function hideCell(r, c, imageData) {
    changeImage(r, c, imageData[0].src, imageData[0].alt);
}

function updateNumberOfMoves(numberOfMoves) {
    const numberOfMovesLabel = document.getElementById("moves-label");
    numberOfMovesLabel.innerHTML = `<em>Score</em>: <strong>${++numberOfMoves}</strong>`;
    return numberOfMoves;
}

function startAnimation(r, c) {
    const image = document.getElementById(`image${r},${c}`);
    image.classList.toggle("rotate");
}

function startGame(n = 6, numberOfSeconds = 0.5, imageFolder = "Images1") {
    const bestScore = getBestScore();
    const bestTime = getBestTime();
    const timer = startTimer();
    const imageData = getImageData(imageFolder);
    const numbers = getNumbers(n);
    const randomNumbersArray = getRandomNumbers(numbers);

    const matrix = [];
    const visibleMatrix = [];
    const table = computeGameTable(n, randomNumbersArray, imageData, matrix, visibleMatrix);

    console.log(matrix);

    let firstCellClickedVal = false;
    let firstCellClickedRow = -1;
    let firstCellClickedCol = -1;

    let secondCellClickedVal = false;
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
            let rowIndex = undefined;
            let colIndex = undefined;

            if(cell.tagName === "IMG") {
                const tableCell = cell.closest("td");

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
                let validMove = false;

                const clickedImageIndex = matrix[rowIndex][colIndex];
                changeImage(rowIndex, colIndex, imageData[clickedImageIndex].src, imageData[clickedImageIndex].alt);

                if(firstCellClickedVal === false) {
                    if(!visibleMatrix[rowIndex][colIndex]) {
                        firstCellClickedVal = imageData[clickedImageIndex].src;
                        firstCellClickedRow = rowIndex;
                        firstCellClickedCol = colIndex;

                        validMove = true;
                    }
                }
                else if(!visibleMatrix[rowIndex][colIndex]) {
                    if(firstCellClickedRow === rowIndex && firstCellClickedCol === colIndex) {
                        return;
                    }

                    secondCellClickedVal = imageData[clickedImageIndex].src;
                    secondCellClickedRow = rowIndex;
                    secondCellClickedCol = colIndex;

                    console.clear();
                    console.log(`First cell clicked value: ${firstCellClickedVal}`);
                    console.log(`Second cell clicked value: ${secondCellClickedVal}`);

                    if(firstCellClickedVal === secondCellClickedVal) {
                        if (firstCellClickedRow !== secondCellClickedRow || firstCellClickedCol !== secondCellClickedCol) {
                            console.log("MATCH");

                            hiddenElements -= 2;
                            visibleMatrix[firstCellClickedRow][firstCellClickedCol] = visibleMatrix[secondCellClickedRow][secondCellClickedCol] = true;

                            validMove = true;
                        }
                        else {
                            console.log("SAME");

                            blocked = true;
                            setTimeout(function() {
                                hideCell(firstCellClickedRow, firstCellClickedCol, imageData);
                                blocked = false;
                            }, numberOfSeconds * 1000);
                        }
                    }
                    else {
                        console.log("NO MATCH");

                        blocked = true;
                        setTimeout(function() {
                            hideCell(firstCellClickedRow, firstCellClickedCol, imageData);
                            hideCell(secondCellClickedRow, secondCellClickedCol, imageData);
                            blocked = false;
                        }, numberOfSeconds * 1000);

                        validMove = true;
                    }

                    firstCellClickedVal = secondCellClickedVal = false;
                }

                if(validMove) {
                    startAnimation(rowIndex, colIndex);
                    numberOfMoves = updateNumberOfMoves(numberOfMoves);
                }
            }
        }

        if(hiddenElements === 0 && win === false) {
            clearInterval(timer);

            alert("YOU WIN!");
            win = true;

            if(bestScore === null || numberOfMoves < bestScore) {
                setBestScore(numberOfMoves);
            }
            if(bestTime === null || timeCount < bestTime) {
                setBestTime(timeCount);
            }
        }
    });
}

function getImageFolder() {
    const selectElement = document.getElementById("cards-type-select");
    const selectedIndex = selectElement.selectedIndex;
    const selectedValue = selectElement.options[selectedIndex].value;
    return `Images${selectedValue.slice("option".length)}`;
}

function createGame() {
    const numberOfSeconds = document.getElementById("number-of-seconds-input").value;
    document.getElementsByClassName("settings-container")[0].style.display = 'none';
    document.getElementsByClassName("game-container")[0].style.display = 'block';
    startGame(6, numberOfSeconds, getImageFolder());

    const generateGameButton = document.getElementById("generate-game-button");
    generateGameButton.disabled = true;
}