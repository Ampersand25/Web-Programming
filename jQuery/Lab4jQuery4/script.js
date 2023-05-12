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

function compare(val1, val2, asc) {
    if(isNumber(val1) && isNumber(val2)) {
        val1 = Number(val1);
        val2 = Number(val2);
    }
    return (asc) ? (val1 <= val2) : (val1 >= val2);
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
            const leftTableCellValue = $(table.rows[rowIndex].cells[col1]).text();
            const rightTableCellValue = $(table.rows[rowIndex].cells[col2]).text();

            const comp = compare(leftTableCellValue, rightTableCellValue, asc);
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
            const upTableCellValue = $(table.rows[row1].cells[colIndex]).text();
            const downTableCellValue = $(table.rows[row2].cells[colIndex]).text();

            const comp = compare(upTableCellValue, downTableCellValue, asc);
            if(!comp) {
                for (let col = 0; col < totalCols; ++col) {
                    swapCells(table, row1, col, row2, col);
                }
            }
        }
    }
}

function sortTable(table, totalRows, totalCols, rowIndex, colIndex, asc, isVertical) {
    (isVertical) ? (sortVerticalTable(table, totalRows, totalCols, rowIndex, asc)) : (sortHorizontalTable(table, totalRows, totalCols, colIndex, asc));
}

function createSortableTable(table, isVertical) {
    const totalRows = $(table).find("tr").length;
    const totalCols = $(table).find("tr:first th, tr:first td").length;

    console.log("\n");
    console.log(`Number of rows: ${totalRows}`);
    console.log(`Number of cols: ${totalCols}`);

    let lastHeaderText = "";
    let asc = true;

    $(table).find("th").click(function() {
        const headerText = $(this).text();
        const rowIndex = $(this).parent().index();
        const colIndex = $(this).index();

        console.log("\n");
        console.log("Header clicked");
        console.log(`Text: ${headerText}`);
        console.log(`Row: ${rowIndex}`);
        console.log(`Col: ${colIndex}`);

        asc = (headerText !== lastHeaderText) ? (true) : (!asc);
        sortTable(table, totalRows, totalCols, rowIndex, colIndex, asc, isVertical);

        lastHeaderText = headerText;
    });
}

function createSortableTables(className, isVertical) {
    $(`.${className}`).each((index, element) => {
        createSortableTable(element, isVertical);
    });
}

$("document").ready(() => {
    createSortableTables("vertical-table", true);
    createSortableTables("horizontal-table", false);
});