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

firstSelect.addEventListener("dblclick", function(event) {
    const optionText = firstSelect.options[firstSelect.selectedIndex].text;
    console.log("Selected option from first select: " + optionText);

    const pos = getPositionOfOptionInsideSelect(firstSelect, optionText);
    firstSelect.remove(pos);

    const option = document.createElement('option');
    option.text = optionText;
    secondSelect.appendChild(option);

    updateSelectsSize();
});

secondSelect.addEventListener("dblclick", function(event) {
    const optionText = secondSelect.options[secondSelect.selectedIndex].text;
    console.log("Selected option from second select: " + optionText);

    const pos = getPositionOfOptionInsideSelect(secondSelect, optionText);
    secondSelect.remove(pos);

    const option = document.createElement('option');
    option.text = optionText;
    firstSelect.appendChild(option);

    updateSelectsSize();
});