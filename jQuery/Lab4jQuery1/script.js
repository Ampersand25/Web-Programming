/*
Enunt:
Sa se scrie o pagina HTML ce contine doua liste cu mai multe elemente fiecare, create cu ajutorul tagului <select>.
La un dubluclick pe un element al primei liste, acesta va fi mutat in lista a doua si invers.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

function updateSelectSize(select) {
    select.attr("size", select.prop("length"));
}

function selectingItemFromSelect(firstSelect, secondSelect) {
    firstSelect.on("dblclick", () => {
        const optionText = firstSelect.find(":selected").text();
        console.log(`Selected option: ${optionText}`);

        firstSelect.find(`option:contains(${optionText})`).remove();
        secondSelect.append($('<option>', { text: optionText }));

        updateSelectSize(firstSelect);
        updateSelectSize(secondSelect);
    });
}

$("document").ready(() => {
    const firstSelect = $("#first-select");
    const secondSelect = $("#second-select");

    updateSelectSize(firstSelect);
    updateSelectSize(secondSelect);

    selectingItemFromSelect(firstSelect, secondSelect);
    selectingItemFromSelect(secondSelect, firstSelect);
});