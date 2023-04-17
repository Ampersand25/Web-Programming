/*
Enunt:
Sa se scrie o pagina HTML ce contine un tabel cu cel putin trei coloane si cel putin trei linii.
Prima coloana reprezinta antetul.
Cand utilizatorul va da click pe o celula din antet, elementele din tabel se vor sorta crescator sau descrescator in functie de valorile prezente pe linia corespunzatoare antetului pe care s-a dat click.
Codul JavaScript va fi reutilizabil si va permite crearea unui comportament de tabel sortabil pentru mai multe tabele existente in cadrul paginii.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
Exemplu de tabel ce se doreste a fi sortat (sortarea se va face alfabetic dupa numele fructului, dupa pret sau dupa cantitate):
Fructe     Mere  Pere
Pret       3     4
Cantitate  8     6
Dupa rezolvarea problemei, implementati o noua varianta in care capul de tabel este orizontal, nu vertical.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

function getNumberOfRows(table) {
    return table.rows.length;
}

function getNumberOfCols(table) {
    return table.rows[0].cells.length;
}

function compare(val1, val2, asc) {
    if(asc) {
        return val1 <= val2;
    }
    return val1 >= val2;
}

function swapCells(table, row1, col1, row2, col2) {
    const temp = table.rows[row1].cells[col1].innerHTML;
    table.rows[row1].cells[col1].innerHTML = table.rows[row2].cells[col2].innerHTML;
    table.rows[row2].cells[col2].innerHTML = temp;
}

function isNumber(str) {
    return !isNaN(str);
}

function sortVerticalTable(table, totalRows, totalCols, rowIndex, asc) {
    console.log("\n");
    console.log((asc) ? ("*SORT ASCENDING*") : ("*SORT DESCENDING*"));

    for(let col1 = 1; col1 < totalCols; ++col1) {
        for(let col2 = col1 + 1; col2 < totalCols; ++col2) {
            const leftTableCellValue = table.rows[rowIndex].cells[col1].innerHTML;
            const rightTableCellValue = table.rows[rowIndex].cells[col2].innerHTML;

            let comp;
            if(isNumber(leftTableCellValue) && isNumber(rightTableCellValue)) {
                const leftTableCellValueToNumber = Number(leftTableCellValue);
                const rightTableCellValueToNumber = Number(rightTableCellValue);
                comp = compare(leftTableCellValueToNumber, rightTableCellValueToNumber, asc);
            }
            else {
                comp = compare(leftTableCellValue, rightTableCellValue, asc);
            }

            if(!comp) {
                for (let row = 0; row < totalRows; ++row) {
                    swapCells(table, row, col1, row, col2);
                }
            }
        }
    }
}

function sortHorizontalTable(table, totalRows, totalCols, colIndex, asc) {
    console.log("\n");
    console.log((asc) ? ("*SORT ASCENDING*") : ("*SORT DESCENDING*"));

    for(let row1 = 1; row1 < totalRows; ++row1) {
        for(let row2 = row1 + 1; row2 < totalRows; ++row2) {
            const upTableCellValue = table.rows[row1].cells[colIndex].innerHTML;
            const downTableCellValue = table.rows[row2].cells[colIndex].innerHTML;

            let comp;
            if(isNumber(upTableCellValue) && isNumber(downTableCellValue)) {
                const upTableCellValueToNumber = Number(upTableCellValue);
                const downTableCellValueToNumber = Number(downTableCellValue);
                comp = compare(upTableCellValueToNumber, downTableCellValueToNumber, asc);
            }
            else {
                comp = compare(upTableCellValue, downTableCellValue, asc);
            }

            if(!comp) {
                for (let col = 0; col < totalCols; ++col) {
                    swapCells(table, row1, col, row2, col);
                }
            }
        }
    }
}

function main(table, isVertical) {
    const totalRows = getNumberOfRows(table);
    const totalCols = getNumberOfCols(table);

    console.log(`Number of rows: ${totalRows}`);
    console.log(`Number of cols: ${totalCols}`);

    let lastHeaderText = "";
    let asc = true;

    document.addEventListener("DOMContentLoaded", function() {
        const headers = table.getElementsByTagName("th");
        for(let i = 0; i < headers.length; ++i) {
            headers[i].addEventListener("click", function() {
                const headerText = this.textContent;
                const rowIndex = this.parentNode.rowIndex;
                const colIndex = Array.prototype.indexOf.call(this.parentNode.children, this);

                console.log("\n");
                console.log("Header clicked");
                console.log(`Text: ${headerText}`);
                console.log(`Row: ${rowIndex}`);
                console.log(`Col: ${colIndex}`);

                if(headerText !== lastHeaderText) {
                    asc = true;
                }
                else {
                    asc = !asc;
                }

                if(isVertical) {
                    sortVerticalTable(table, totalRows, totalCols, rowIndex, asc);
                }
                else {
                    sortHorizontalTable(table, totalRows, totalCols, colIndex, asc);
                }

                lastHeaderText = headerText;
            });
        }
    });
}

const table1 = document.getElementById("first-table");
const table2 = document.getElementById("second-table");
const table3 = document.getElementById("third-table");

main(table1, true);
main(table2, true);
main(table3, true);

const table4 = document.getElementById("fourth-table");
const table5 = document.getElementById("fifth-table");
const table6 = document.getElementById("sixth-table");

main(table4, false);
main(table5, false);
main(table6, false);