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
    $.ajax({
        url: `http://localhost/Lab5AJAX/Problema2/pb2_2.php?n=${n}&current_records=${current}`,
        method: "GET",
        success: function(response) {
            clearTable();

            const clients = response.split("<br>").filter(Boolean);
            clients.forEach(function(client) {
                addClientToTable(client);
            });
        },
        error: function(xhr, status, error) {
            console.error("[X]Error in function displayRecordsGET!");
        }
    });
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
    $.ajax({
        url: "http://localhost/Lab5AJAX/Problema2/pb2_3.php",
        type: "POST",
        dataType: "text",
        contentType: "application/json",
        data: JSON.stringify({ n: n, current_records: current }),
        success: function(response) {
            clearTable();

            const clients = response.split("<br>").filter(Boolean);
            clients.forEach(function(client) {
                addClientToTable(client);
            });
        },
        error: function(xhr, status, error) {
            console.error("[X]Error in function displayInitialRecordsPOST!");
        }
    });
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
    $.get("http://localhost/Lab5AJAX/Problema2/pb2_1.php", function(response) {
        run(parseInt(response), n);
    })
    .fail(function(xhr, status, error) {
        console.error("[X]Error in showCitiesGET function!");
    });
}

function getNumberOfRecordsPOST(n) {
    $.post({
        url: "http://localhost/Lab5AJAX/Problema2/pb2_1.php",
        dataType: "json",
        success: function(response) {
            run(parseInt(response), n);
        },
        error: function(xhr, status, errro) {
            console.error("[X]Error in function getNumberOfRecordsPOST!");
        }
    });
}

function getNumberOfRecords(method = "GET", n) {
    (method === "GET") ? (getNumberOfRecordsGET(n)) : (getNumberOfRecordsPOST(n));
}

function displayTable(n = 3) {
    getNumberOfRecords("GET", n);
    //getNumberOfRecords("POST", n);
}

function computeTable() {
    const computeGameBtn = document.querySelector("#compute-table-button");
    computeGameBtn.disabled = true;

    const input = document.querySelector("input");
    input.disabled = true;

    const table = document.querySelector("#clients-table");
    table.style.display = "block";

    const numberOfItemsPerPage = parseInt(document.querySelector("#number-of-items-input").value);
    displayTable(numberOfItemsPerPage);
}