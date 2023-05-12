/*
Enunt:
Sa se scrie o pagina HTML ce contine doua liste cu mai multe elemente fiecare, create cu ajutorul tagului <select>.
La un dubluclick pe un element al primei liste, acesta va fi mutat in lista a doua si invers.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

$("document").ready(() => {
    $("#first-select").attr("size", $("#first-select").prop("length"));
    $("#second-select").attr("size", $("#second-select").prop("length"));

    $("#first-select").on("dblclick", () => {
        const optionText = $("#first-select").find(":selected").text();
        console.log(`Selected option from first select: ${optionText}`);

        $("#first-select").find(`option:contains(${optionText})`).remove();
        $("#second-select").append($('<option>', { text: optionText }));

        $("#first-select").attr("size", $("#first-select").prop("length"));
        $("#second-select").attr("size", $("#second-select").prop("length"));
    });

    $("#second-select").on("dblclick", () => {
        const optionText = $("#second-select").find(":selected").text();
        console.log(`Selected option from second select: ${optionText}`);

        $("#second-select").find(`option:contains(${optionText})`).remove();
        $("#first-select").append($('<option>', { text: optionText }));

        $("#first-select").attr("size", $("#first-select").prop("length"));
        $("#second-select").attr("size", $("#second-select").prop("length"));
    });
});