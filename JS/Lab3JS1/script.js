/*
Enunt:
Sa se scrie o pagina HTML ce contine doua liste cu mai multe elemente fiecare, create cu ajutorul tagului <select>.
La un dubluclick pe un element al primei liste, acesta va fi mutat in lista a doua si invers.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

function updateSelectSize(selectElement)
{
    selectElement.size = selectElement.length;
}

function getPositionOfOptionInsideSelect(selectElement, searchedOptionText) {
    for(let i = 0; i < selectElement.length; ++i) {
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
    const option = document.createElement("option");
    option.text = optionText;
    selectElement.appendChild(option);
}

function addDoubleClickEventOnSelect(firstSelect, secondSelect, selectName) {
    firstSelect.addEventListener("dblclick", function() {
        const optionText = firstSelect.options[firstSelect.selectedIndex].text;
        console.log(`Selected option from ${selectName}: ${optionText}`);

        removeOptionFromSelect(firstSelect, optionText);
        addOptionToSelect(secondSelect, optionText);

        updateSelectSize(firstSelect);
        updateSelectSize(secondSelect);
    });
}

function main() {
    const firstSelect = document.getElementById("first-select");
    const secondSelect = document.getElementById("second-select");

    updateSelectSize(firstSelect);
    updateSelectSize(secondSelect);

    addDoubleClickEventOnSelect(firstSelect, secondSelect, "first select");
    addDoubleClickEventOnSelect(secondSelect, firstSelect, "second select");
}