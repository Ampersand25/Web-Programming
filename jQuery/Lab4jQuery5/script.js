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
    return (currentItem - 1 === 0) ? (numberOfListItems) : (currentItem - 1);
}

function getNextItem(currentItem, numberOfListItems) {
    return (currentItem + 1 > numberOfListItems) ? (1) : (currentItem + 1);
}

function hideAllListItemsExceptFirstOne() {
    $(`#main-list li:not(:first-child)`).css("visibility", "hidden");
}

function hideShowListItem(currentItem, numberOfListItems, reverse = false) {
    $(`#li${currentItem}`).css("visibility", "hidden");
    //$(`#image${currentItem}`).removeClass("flip-animation");
    $(`#image${currentItem}`).fadeOut();

    const newItem = (!reverse) ? (getNextItem(currentItem, numberOfListItems)) : (getPrevItem(currentItem, numberOfListItems));
    $(`#li${newItem}`).css("visibility", "visible");
    //$(`#image${newItem}`).addClass("flip-animation");
    $(`#image${newItem}`).fadeIn();

    return newItem;
}

function updateCurrentItemLabel(currentItem, numberOfListItems) {
    $("#current-item-label").text(`Current image: ${currentItem}/${numberOfListItems}`);
}

function setIntervalFunction(gameInfo) {
    setInterval(() => {
        ++gameInfo.currentSecond;
        console.log(`${gameInfo.currentSecond}/${gameInfo.n}`);
        if(gameInfo.currentSecond === gameInfo.n) {
            console.log("NEXT IMAGE!");
            gameInfo.currentItem = hideShowListItem(gameInfo.currentItem, gameInfo.numberOfListItems, false);
            updateCurrentItemLabel(gameInfo.currentItem, gameInfo.numberOfListItems);

            gameInfo.currentSecond = 0;
        }
    }, 1000);
}

function addEventListenerToPrevButton(gameInfo) {
    $("#previous-button").click(() => {
        console.log("PREV IMAGE!");
        gameInfo.currentItem = hideShowListItem(gameInfo.currentItem, gameInfo.numberOfListItems, true);
        updateCurrentItemLabel(gameInfo.currentItem, gameInfo.numberOfListItems);
        gameInfo.currentSecond = 0;
    });
}

function addEventListenerToNextButton(gameInfo) {
    $("#next-button").click(() => {
        console.log("NEXT IMAGE!");
        gameInfo.currentItem = hideShowListItem(gameInfo.currentItem, gameInfo.numberOfListItems, false);
        updateCurrentItemLabel(gameInfo.currentItem, gameInfo.numberOfListItems);
        gameInfo.currentSecond = 0;
    });
}

function startGame(n, numberOfListItems) {
    hideAllListItemsExceptFirstOne();

    let gameInfo = {n: n, numberOfListItems: numberOfListItems, currentItem: 1, currentSecond: 0};

    setIntervalFunction(gameInfo);
    addEventListenerToPrevButton(gameInfo);
    addEventListenerToNextButton(gameInfo);
}

$("document").ready(() => {
    $("#generate-game-button").click(() => {
        const n = Number($("#number-of-seconds-input").val());
        const numberOfListItems = $("#main-list > li").length;
        updateCurrentItemLabel(1, numberOfListItems);
        startGame(n, numberOfListItems);

        $("#generate-game-button").prop("disabled", true);

        $("#previous-button").prop("disabled", false);
        $("#next-button").prop("disabled", false);
    });
});