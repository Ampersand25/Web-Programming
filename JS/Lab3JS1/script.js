/*
Enunt:
Sa se scrie o pagina HTML ce contine doua liste cu mai multe elemente fiecare, create cu ajutorul tagului <select>.
La un dubluclick pe un element al primei liste, acesta va fi mutat in lista a doua si invers.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

const firstSelect = document.getElementById("first-select");
const secondSelect = document.getElementById("second-select");

function updateSelectsSize()
{
    firstSelect.size = firstSelect.length;
    secondSelect.size = secondSelect.length;
}

updateSelectsSize();

function getPositionOfOptionInsideSelect(selectElement, searchedOptionText) {
    for (let i = 0; i < selectElement.length; ++i) {
        if (selectElement.options[i].text === searchedOptionText) {
            return i;
        }
    }
    alert("There is no option with the given text in the select!");
    return -1;
}

function removeOptionFromSelect(selectElement, optionText) {
    const pos = getPositionOfOptionInsideSelect(selectElement, optionText);
    selectElement.remove(pos);
}

function addOptionToSelect(selectElement, optionText) {
    const option = document.createElement('option');
    option.text = optionText;
    selectElement.appendChild(option);
}

firstSelect.addEventListener("dblclick", function(event) {
    const optionText = firstSelect.options[firstSelect.selectedIndex].text;
    console.log("Selected option from first select: " + optionText);

    removeOptionFromSelect(firstSelect, optionText);
    addOptionToSelect(secondSelect, optionText);
    updateSelectsSize();
});

secondSelect.addEventListener("dblclick", function(event) {
    const optionText = secondSelect.options[secondSelect.selectedIndex].text;
    console.log("Selected option from second select: " + optionText);

    removeOptionFromSelect(secondSelect, optionText);
    addOptionToSelect(firstSelect, optionText);
    updateSelectsSize();
});