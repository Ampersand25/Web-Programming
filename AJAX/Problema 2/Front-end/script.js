// O tabela dintr-o baza de date mentinuta server side are urmatoarele atribute: Nume, Prenume, Telefon, E-mail.
// Inregistrarile din aceasta tabela vor fi afisate pe client paginat cate 3 pe pagina, impreuna cu doua butoane Next si Previous.
// La actionarea butoanelor Next si Previous se vor afisa urmatoarele 3, respectiv anterioarele 3 inregistrari din baza de date, care vor fi aduse pe client pintr-un apel AJAX.
// Butoanele Next si Previous trebuie sa devina disabled daca in urma actionarii acestora nu se mai pot aduce inregistrari noi pe client.

console.log("Problema 2 AJAX - Laborator 5 Programare Web");

let current;

function clearTable() {
    const table = document.querySelector("#clients-table");
    const rows = table.querySelectorAll("tr");

    for (let i = rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function addClientToTable(client) {
    const clientSplit = client.split("|");
    const nume = clientSplit[0];
    const prenume = clientSplit[1];
    const telefon = clientSplit[2];
    const email = clientSplit[3];

    const table = document.querySelector("#clients-table");
    const newRow = table.insertRow();

    const cell1 = newRow.insertCell();
    const cell2 = newRow.insertCell();
    const cell3 = newRow.insertCell();
    const cell4 = newRow.insertCell();

    //cell1.textContent = `${nume}`;
    //cell2.textContent = `${prenume}`;
    //cell3.textContent = `${telefon}`;
    //cell4.textContent = `${email}`;

    cell1.innerText = nume;
    cell2.innerText = prenume;
    cell3.innerText = telefon;
    cell4.innerText = email;
}

function displayRecordsGET(n) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            clearTable();

            const response = this.responseText.split("<br>");
            if (response[response.length - 1] === "") {
                response.pop();
            }
            for (let i = 0; i < response.length; ++i) {
                const client = response[i];
                addClientToTable(client);
            }
        }
    };

    xhttp.open("GET", `http://localhost/Lab5AJAX/Problema2/pb2_2.php?n=${n}&current_records=${current}`, true);
    xhttp.send(null);
}

function getPrevRecords(n) {
    console.log("PREV RECORDS");
    current -= n;
    displayRecordsGET(n);
}

function getNextRecords(n) {
    console.log("NEXT RECORDS");
    current += n;
    displayRecordsGET(n);
}

function displayInitialRecordsPOST(n) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            clearTable();

            const response = this.responseText.split("<br>");
            if (response[response.length - 1] === "") {
                response.pop();
            }
            for (let i = 0; i < response.length; ++i) {
                const client = response[i];
                addClientToTable(client);
            }
        }
    };

    const url = "http://localhost/Lab5AJAX/Problema2/pb2_3.php";
    const data = { n: n, current_records : current };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(data));
}

function run(numberOfRecords, n) {
    const prevBtn = document.querySelector("#prev-button");
    const nextBtn = document.querySelector("#next-button");

    if (numberOfRecords < n) {
        nextBtn.disabled = true;
    }

    current = n;

    displayInitialRecordsPOST(n);

    console.log(`CURRENT VALUE: ${current}/${numberOfRecords}`);
    console.log("\n");

    prevBtn.addEventListener("click", () => {
        getPrevRecords(n);
        nextBtn.disabled = false;

        if (current === n) {
            prevBtn.disabled = true;
        }

        console.log(`CURRENT VALUE: ${current}/${numberOfRecords}`);
        console.log("\n");
    });

    nextBtn.addEventListener("click", () => {
        getNextRecords(n);
        prevBtn.disabled = false;

        if (current >= numberOfRecords) {
            nextBtn.disabled = true;
        }

        console.log(`CURRENT VALUE: ${current}/${numberOfRecords}`);
        console.log("\n");
    });
}

function getNumberOfRecordsGET(n) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            run(parseInt(this.responseText), n);
        }
    };

    xhttp.open("GET", `http://localhost/Lab5AJAX/Problema2/pb2_1.php`, true);
    xhttp.send(null);
}

function getNumberOfRecordsPOST(n) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            run(parseInt(this.responseText), n);
        }
    };

    xhttp.open("POST", "http://localhost/Lab5AJAX/Problema2/pb2_1.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify({}));
}

function getNumberOfRecords(method = "GET", n) {
    (method === "GET") ? (getNumberOfRecordsGET(n)) : (getNumberOfRecordsPOST(n));
}

function main(n = 3) {
    getNumberOfRecords("GET", n);
    //getNumberOfRecords("POST", n);
}

main();
//main(2);
//main(3);
//main(4);