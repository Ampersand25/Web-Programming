/*
Enunt:
Intr-o pagina HTML exista o lista descrisa cu ajutorul tagului <ol>.
Fiecare element din lista (<li>) contine o imagine (<img>), si un link (<a>).
Elemente listei, mai putin primul dintre ele, nu sunt vizibile initial (se poate folosi in acest sens CSS).
Afisarea unui element din lista presupune afisarea imaginii si a textului ca link peste imagine (a se vedea ca exemplu carouselul din pagina facultatii).
Dupa n secunde printr-un efect de tranzitie va fi afisat urmatorul element din lista.
Se vor implementa si doua butoane Next si Previous care vor permite afisarea elementelor urmatoare sau anterioare fara a se astepta trecerea celor n secunde.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

function getPrevItem(currentItem, numberOfListItems) {
    let itemNumber = currentItem - 1;
    if(itemNumber === 0) {
        itemNumber = numberOfListItems;
    }
    return itemNumber;
}

function getNextItem(currentItem, numberOfListItems) {
    let itemNumber = currentItem + 1;
    if(itemNumber > numberOfListItems) {
        itemNumber = 1;
    }
    return itemNumber;
}

function hideListItem(itemNumber) {
    const itemID = `li${itemNumber}`;
    const item = document.getElementById(itemID);
    item.style.visibility = "hidden";
}

function showListItem(itemNumber) {
    const itemID = `li${itemNumber}`;
    const item = document.getElementById(itemID);
    item.style.visibility = "visible";
}

function hideAllListItemsExceptFirstOne(numberOfListItems) {
    for(let i = 2; i <= numberOfListItems; ++i) {
        hideListItem(i);
    }
}

function setImageAnimation(itemID) {
    const imageID = `image${itemID}`;
    const image = document.getElementById(imageID);
    image.classList.add("flip-animation");
}

function clearImageAnimation(itemID) {
    const imageID = `image${itemID}`;
    const image = document.getElementById(imageID);
    image.classList.remove("flip-animation");
}

function hideShowListItem(currentItem, numberOfListItems, reverse = false) {
    hideListItem(currentItem);
    clearImageAnimation(currentItem);

    let newItem;
    if(!reverse) {
        newItem = getNextItem(currentItem, numberOfListItems);
    }
    else {
        newItem = getPrevItem(currentItem, numberOfListItems);
    }
    showListItem(newItem);
    setImageAnimation(newItem);
    return newItem;
}

function updateCurrentItemLabel(currentItem, numberOfListItems) {
    const label = document.getElementById("current-item-label");
    label.innerText = `Current image: ${currentItem}/${numberOfListItems}`;
}

function setIntervalFunction(gameInfo) {
    setInterval(function() {
        ++gameInfo.currentSecond;
        console.log(gameInfo.currentSecond + "/" + gameInfo.n);
        if(gameInfo.currentSecond === gameInfo.n) {
            console.log("NEXT IMAGE!");
            gameInfo.currentItem = hideShowListItem(gameInfo.currentItem, gameInfo.numberOfListItems, false);
            updateCurrentItemLabel(gameInfo.currentItem, gameInfo.numberOfListItems);

            gameInfo.currentSecond = 0;
        }
    }, 1000);
}

function addEventListenerToPrevButton(gameInfo) {
    const prevBtn = document.getElementById("previous-button");
    prevBtn.addEventListener("click", function() {
        console.log("PREV IMAGE!");
        gameInfo.currentItem = hideShowListItem(gameInfo.currentItem, gameInfo.numberOfListItems, true);
        updateCurrentItemLabel(gameInfo.currentItem, gameInfo.numberOfListItems);
        gameInfo.currentSecond = 0;
    });
}

function addEventListenerToNextButton(gameInfo) {
    const nextBtn = document.getElementById("next-button");
    nextBtn.addEventListener("click", function() {
        console.log("NEXT IMAGE!");
        gameInfo.currentItem = hideShowListItem(gameInfo.currentItem, gameInfo.numberOfListItems, false);
        updateCurrentItemLabel(gameInfo.currentItem, gameInfo.numberOfListItems);
        gameInfo.currentSecond = 0;
    });
}

function startGame(n, numberOfListItems) {
    hideAllListItemsExceptFirstOne(numberOfListItems);

    let gameInfo = {n: n, numberOfListItems: numberOfListItems, currentItem: 1, currentSecond: 0};

    setIntervalFunction(gameInfo);
    addEventListenerToPrevButton(gameInfo);
    addEventListenerToNextButton(gameInfo);
}

function disableButton(buttonID) {
    const btn = document.getElementById(buttonID);
    btn.disabled = true;
}

function enableButton(buttonID) {
    const btn = document.getElementById(buttonID);
    btn.disabled = false;
}

function enableNavigationButtons() {
    enableButton("previous-button");
    enableButton("next-button");
}

function generateGame() {
    const n = Number(document.getElementById("number-of-seconds-input").value);
    const orderedList = document.getElementById("main-list");
    const numberOfListItems = orderedList.getElementsByTagName("li").length;
    updateCurrentItemLabel(1, numberOfListItems);
    startGame(n, numberOfListItems);

    disableButton("generate-game-button");
    enableNavigationButtons();
}