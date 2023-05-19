// Sa se scrie o pagina HTML care contine doua liste cu statii de plecare si statii de sosire pentru trenuri.
// Server side se intretine o baza de date cu inregistrari de forma:
// (Oras1, Oras2)
// (Oras1, Oras3)
// (Oras2, Oras4)
// (Oras2, Oras5)
// (Oras6, Oras7)
// In momentul in care utilizatorul selecteaza o statie de plecare in prima componenta lista a doua se va actualiza folosind AJAX cu lista statiilor in care se poate ajunge din orasul selectat in prima lista.

console.log("Problema 1 AJAX - Laborator 5 Programare Web");

let lastRadioBtnClickedLabelText = undefined;

function isUndefined(val) {
    return typeof val === 'undefined';
}

function addSosireToList(content) {
    const sosireNoua = document.createElement("li");
    sosireNoua.textContent = content;

    const sosiriList = document.querySelector("#lista-sosiri");
    sosiriList.appendChild(sosireNoua);
}

function clearSosiriList() {
    const sosiriList = document.querySelector("#lista-sosiri");
    while (sosiriList.firstChild) {
        sosiriList.removeChild(sosiriList.firstChild);
    }
}

function showRoutes(plecare) {
    $.ajax({
        url: `http://localhost/Lab5AJAX/Problema1/pb1_2.php?plecare=${plecare}`,
        method: "GET",
        success: function(response) {
            clearSosiriList();

            const sosiri = response.split("<br>");
            if (sosiri[sosiri.length - 1] === "") {
                sosiri.pop();
            }
            for (let i = 0; i < sosiri.length; ++i) {
                addSosireToList(sosiri[i]);
            }
        },
        error: function(xhr, status, error) {
            console.error("[X]Error in showRoutes function!");
        }
    });
}

function showReverseRoutes(plecare) {
    $.ajax({
        url: "http://localhost/Lab5AJAX/Problema1/pb1_3.php",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ plecare: plecare }),
        success: function(response) {
            clearSosiriList();

            const sosiri = response.split("<br>");
            if (sosiri[sosiri.length - 1] === "") {
                sosiri.pop();
            }
            for (let i = 0; i < sosiri.length; ++i) {
                addSosireToList(sosiri[i]);
            }
        },
        error: function(xhr, status, error) {
            console.error("[X]Error in showReverseRoutes function!");
        }
    });
}

function addCityToList(city, nr) {
    const plecareNoua = document.createElement("li");
    plecareNoua.innerHTML = `<input id="statie-plecare${nr}" type="radio" name="oras-plecare" value="${city}" class="radio-option">
                             <label for="statie-plecare${nr}" class="radio-button-label">${city}</label>`;
    const plecariList = document.querySelector("#lista-plecari");
    plecariList.appendChild(plecareNoua);

    document.querySelector(`#statie-plecare${nr}`).addEventListener("click", (event) => {
        const clickedRadioBtn = event.target;
        const label = document.querySelector(`label[for=${clickedRadioBtn.id}]`);
        const labelText = label.textContent;

        if (isUndefined(lastRadioBtnClickedLabelText) || lastRadioBtnClickedLabelText !== labelText) {
            console.log(`Orasul de plecare ales: ${labelText}`);

            const curseDirecteRadioBtn = document.querySelector("#curse-directe");
            if (curseDirecteRadioBtn.checked) {
                console.log("Se vor afisa cursele directe (de la sursa/plecare la destinatie/sosire)!");
                showRoutes(labelText);
            }
            else {
                console.log("Se vor afisa cursele inverse (de la destinatie/sosire la sursa/plecare)!");
                showReverseRoutes(labelText);
            }

            console.log("\n");
        }

        lastRadioBtnClickedLabelText = labelText;
    });
}

function showCitiesGET() {
    $.get("http://localhost/Lab5AJAX/Problema1/pb1_1.php", function(response) {
        const cities = response.split("<br>").filter(Boolean);
        cities.forEach(function(city, index) {
            addCityToList(city, index + 1);
        });
    })
    .fail(function(xhr, status, error) {
        console.error("[X]Error in showCitiesGET function!");
    });
}

function showCitiesPOST() {
    $.post({
        url: "http://localhost/Lab5AJAX/Problema1/pb1_1.php",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function(response) {
            const cities = response.split("<br>").filter(Boolean);
            cities.forEach(function(city, index) {
                addCityToList(city, index + 1);
            });
        },
        error: function(xhr, status, error) {
            console.error("[X]Error in showCitiesPOST function!");
        }
    });
}

function showCities(requestType = "GET") {
    (requestType === "GET") ? (showCitiesGET()) : (showCitiesPOST());
}

function main() {
    showCities("POST");
}

main();