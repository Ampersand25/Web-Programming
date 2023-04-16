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
    var itemNumber = currentItem - 1;
    if(itemNumber === 0) {
        itemNumber = numberOfListItems;
    }
    return itemNumber;
}

function getNextItem(currentItem, numberOfListItems) {
    var itemNumber = currentItem + 1;
    if(itemNumber > numberOfListItems) {
        itemNumber = 1;
    }
    return itemNumber;
}

function hideListItem(itemNumber) {
    const itemID = "li" + itemNumber;
    const item = document.getElementById(itemID);
    item.style.visibility = "hidden";
}

function showListItem(itemNumber) {
    const itemID = "li" + itemNumber;
    const item = document.getElementById(itemID);
    item.style.visibility = "visible";
}

function hideAllListItemsExceptFirstOne(numberOfListItems) {
    for(let i = 2; i <= numberOfListItems; ++i) {
        hideListItem(i);
    }
}

function hideShowListItem(currentItem, numberOfListItems, reverse = false) {
    hideListItem(currentItem);
    var newItem;
    if(!reverse) {
        newItem = getNextItem(currentItem, numberOfListItems);
    }
    else {
        newItem = getPrevItem(currentItem, numberOfListItems);
    }
    showListItem(newItem);
    return newItem;
}

function startGame(n, numberOfListItems) {
    hideAllListItemsExceptFirstOne(numberOfListItems);

    var currentItem = 1;
    var currentSecond = 0;

    var intervalID = setInterval(function() {
        ++currentSecond;
        console.log(currentSecond + "/" + n);
        if(currentSecond == n) {
            console.log("NEXT IMAGE!");
            currentItem = hideShowListItem(currentItem, numberOfListItems, false);

            currentSecond = 0;
        }
    }, 1000);

    const prevBtn = document.getElementById('previous-button');
    prevBtn.addEventListener("click", function() {
        currentItem = hideShowListItem(currentItem, numberOfListItems, true);
        currentSecond = 0;
    });

    const nextBtn = document.getElementById('next-button');
    nextBtn.addEventListener("click", function() {
        currentItem = hideShowListItem(currentItem, numberOfListItems, false);
        currentSecond = 0;
    });
}

function generateGame() {
    const n = document.getElementById("number-of-seconds-input").value;
    startGame(n, 10);

    const generateGameButton = document.getElementById("generate-game-button");
    generateGameButton.disabled = true;
}