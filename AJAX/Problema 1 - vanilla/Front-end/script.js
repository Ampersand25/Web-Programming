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
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            clearSosiriList();

            const sosiri = this.responseText.split("<br>");
            if (sosiri[sosiri.length - 1] === "") {
                sosiri.pop();
            }
            for (let i = 0; i < sosiri.length; ++i) {
                addSosireToList(sosiri[i]);
            }
        }
    };

    xhttp.open("GET", `http://localhost/Lab5AJAX/Problema1/pb1_2.php?plecare=${plecare}`, true);
    xhttp.send(null);
}

function showReverseRoutes(plecare) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            clearSosiriList();

            const sosiri = this.responseText.split("<br>");
            if (sosiri[sosiri.length - 1] === "") {
                sosiri.pop();
            }
            for (let i = 0; i < sosiri.length; ++i) {
                addSosireToList(sosiri[i]);
            }
        }
    };

    const url = "http://localhost/Lab5AJAX/Problema1/pb1_3.php";
    const data = { plecare: plecare };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
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
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const cities = this.responseText.split("<br>");
            if (cities[cities.length - 1] === "") {
                cities.pop();
            }
            for (let i = 0; i < cities.length; ++i) {
                addCityToList(cities[i], i + 1);
            }
        }
    };

    xhttp.open("GET", `http://localhost/Lab5AJAX/Problema1/pb1_1.php`, true);
    xhttp.send(null);
}

function showCitiesPOST() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            const cities = this.responseText.split("<br>");
            if (cities[cities.length - 1] === "") {
                cities.pop();
            }
            for (let i = 0; i < cities.length; ++i) {
                addCityToList(cities[i], i + 1);
            }
        }
    };

    xhttp.open("POST", "http://localhost/Lab5AJAX/Problema1/pb1_1.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({}));
}

function showCities(requestType = "GET") {
    (requestType === "GET") ? (showCitiesGET()) : (showCitiesPOST());
}

function main() {
    showCities("POST");
}

main();