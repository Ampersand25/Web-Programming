/*
Enunt:
Un formular web va permite unui utilizator sa isi introduca numele, data nasterii, varsta si adresa de e-mail.
La apasarea unui buton “Trimite” se vor valida toate aceste campuri daca sunt completate si daca sunt completate corect.
Daca da, se va afisa un mesaj “Datele sunt completate corect”, altfel, se va afisa un mesaj de genul “Campurile nume si varsta nu sunt completate corect”, aceste campuri fiind “incercuite” intr-o bordura rosie.
Toate aceste validari vor fi implementate pe client in JavaScript.
Nu se vor folosi biblioteci de functii, jQuery, pluginuri, etc.
*/

console.log("Welcome to script.js!");

function clearFields() {
    $("#name-input").val("");
    $("#date-of-birth-input").val("");
    $("#age-input").val("");
    $("#email-input").val("");
}

function validateName(name) {
    name = name.trim();
    if(name.length === 0) {
        return "• Nume - nu ati introdus niciun nume!\n";
    }
    if(name.length < 3) {
        return "• Nume - numele introdus este prea scurt (numele trebuie sa contina minim 3 litere)!\n";
    }
    const validNameRegex = /^[a-zA-Z\s]+$/;
    if(!validNameRegex.test(name)) {
        return "• Nume - numele introdus contine caractere care nu sunt litere!\n";
    }
    return "";
}

function hasNonDigitsAndSlash(string) {
    const pattern = /[^0-9\/]/;
    return pattern.test(string);
}

function isValidDateOfBirth(string) {
    const validDateOfBirthPattern = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2[0-8])\/(19|20)\d\d$/;
    return validDateOfBirthPattern.test(string);
}

function convertToDateOfBirth(string) {
    const parts = string.split("/");

    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    return new Date(year, month - 1, day);
}

function calculateAge(dob) {
    const currentDate = new Date();

    let age = currentDate.getFullYear() - dob.getFullYear();

    const currentMonth = currentDate.getMonth();
    const dobMonth = dob.getMonth();
    const currentDay = currentDate.getDate();
    const dobDay = dob.getDate();

    if(currentMonth < dobMonth || (currentMonth === dobMonth && currentDay < dobDay)) {
        --age;
    }

    return age;
}

function validateDOB(dob) {
    dob = dob.trim();
    if(dob.length === 0) {
        return "• Data nasterii - nu ati introdus nicio data de nastere!\n";
    }
    if(hasNonDigitsAndSlash(dob)) {
        return "• Data nasterii - data de nastere contine caractere invalide (care nu sunt cifre sau caracterul '/')!\n";
    }
    if(!isValidDateOfBirth(dob)) {
        return "• Data nasterii - data de nastere introdusa nu respecta formatul MM/DD/YYYY!\n";
    }
    const age = calculateAge(convertToDateOfBirth(dob));
    console.log("VARSTA: " + age);
    if(age < 3) {
        return "• Data nasterii - varsta prea mica (varsta minima este de 3 ani)!\n";
    }
    if(age > 120) {
        return "• Data nasterii - varsta prea mare (varsta maxima este de 120 ani)!\n";
    }
    return "";
}

function isNumber(string) {
    return !isNaN(string);
}

function isInteger(string) {
    const validIntegerRegex = /^-?\d+$/;
    return validIntegerRegex.test(string);
}

function validateAge(age, dob) {
    age = age.trim();
    if(age.length === 0) {
        return "• Varsta - nu ati introdus nicio varsta!\n";
    }
    if(!isNumber(age)) {
        return "• Varsta - varsta introdusa nu este un numar!\n";
    }
    if(!isInteger(age)) {
        return "• Varsta - varsta introdusa nu este un numar intreg!\n";
    }
    const ageNumber = parseInt(age);
    if(age < 0) {
        return "• Varsta - varsta introdusa nu este un numar natural (este un numar negativ)!\n";
    }
    if(age < 3) {
        return "• Varsta - varsta introdusa este prea mica (varsta minima este de 3 ani)!\n";
    }
    if(age > 120) {
        return "• Varsta - varsta introdusa este prea mare (varsta maxima este de 120 de ani)!\n";
    }
    if(calculateAge(convertToDateOfBirth(dob)) !== ageNumber) {
        return "• Varsta - varsta introdusa nu corespunde cu data nasterii furnizata!\n";
    }
    return "";
}

function validateEmail(email) {
    email = email.trim();
    if(email.length === 0) {
        return "• Email - nu ati introdus nicio adresa de email!\n";
    }
    const validEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if(!validEmailRegex.test(email)) {
        return "• Email - adresa de email introdusa nu este una valida!\n";
    }
    return "";
}

function updateSubmitButtonText() {
    const submitButton = $("#submit-button");
    if(submitButton.text() === "Trimite") {
        submitButton.text("Retrimite");
    }
}

function alertUser(errors) {
    if(errors.length === 0) {
        alert("Datele sunt completate corect!");
    }
    else {
        alert(`Datele nu sunt completate corect!\nCampurile care nu au fost completate corect sunt:\n${errors}`);
    }
}

function validateNameWrapper(correctImg, wrongImg) {
    const nameErrors = validateName($("#name-input").val());

    const color = (nameErrors.length !== 0) ? ("red") : ("green");
    const image = (nameErrors.length !== 0) ? (wrongImg) : (correctImg);

    $("#name-input").css("border", `2px solid ${color}`);
    $("#name-validation-img").attr("src", image);

    return nameErrors;
}

function validateDOBWrapper(correctImg, wrongImg) {
    const dobErrors = validateDOB($("#date-of-birth-input").val());

    const color = (dobErrors.length !== 0) ? ("red") : ("green");
    const image = (dobErrors.length !== 0) ? (wrongImg) : (correctImg);

    $("#date-of-birth-input").css("border", `2px solid ${color}`);
    $("#date-of-birth-validation-img").attr("src", image);

    return dobErrors;
}

function validateAgeWrapper(correctImg, wrongImg) {
    const ageErrors = validateAge($("#age-input").val(), $("#date-of-birth-input").val());

    const color = (ageErrors.length !== 0) ? ("red") : ("green");
    const image = (ageErrors.length !== 0) ? (wrongImg) : (correctImg);

    $("#age-input").css("border", `2px solid ${color}`);
    $("#age-validation-img").attr("src", image);

    return ageErrors;
}

function validateEmailWrapper(correctImg, wrongImg) {
    const emailErrors = validateEmail($("#email-input").val());

    const color = (emailErrors.length !== 0) ? ("red") : ("green");
    const image = (emailErrors.length !== 0) ? (wrongImg) : (correctImg);

    $("#email-input").css("border", `2px solid ${color}`);
    $("#email-validation-img").attr("src", image);

    return emailErrors;
}

function validateData() {
    updateSubmitButtonText();

    const correctImg = "./Images/CorrectImg.png";
    const wrongImg = "./Images/WrongImg.png";

    let errors = "";
    errors += validateNameWrapper(correctImg, wrongImg);
    errors += validateDOBWrapper(correctImg, wrongImg);
    errors += validateAgeWrapper(correctImg, wrongImg);
    errors += validateEmailWrapper(correctImg, wrongImg);

    alertUser(errors);
}

$("document").ready(() => {
    $("#clear-button").click(clearFields);
    $("#submit-button").click(validateData);
});