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
    const nameInput = document.getElementById("name-input");
    const dobInput = document.getElementById("date-of-birth-input");
    const ageInput = document.getElementById("age-input");
    const emailInput = document.getElementById("email-input");

    nameInput.value = "";
    dobInput.value = "";
    ageInput.value = "";
    emailInput.value = "";
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
    const parts = string.split('/');

    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    return new Date(year, month - 1, day);
}

function calculateAge(dob) {
    const currentDate = new Date();

    var age = currentDate.getFullYear() - dob.getFullYear();

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
    var ageNumber = parseInt(age);
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
    const validEmailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(!validEmailRegex.test(email)) {
        return "• Email - adresa de email introdusa nu este una valida!\n";
    }
    return "";
}

function validateData() {
    const submitButton = document.getElementById("submit-button");
    if(submitButton.textContent === "Trimite") {
        submitButton.textContent = "Retrimite";
    }

    const correctImg = "./Images/CorrectImg.png";
    const wrongImg = "./Images/WrongImg.png";

    const nameImg = document.getElementById("name-validation-img");
    const dobImg = document.getElementById("date-of-birth-validation-img");
    const ageImg = document.getElementById("age-validation-img");
    const emailImg = document.getElementById("email-validation-img");

    const nameInput = document.getElementById("name-input");
    const dobInput = document.getElementById("date-of-birth-input");
    const ageInput = document.getElementById("age-input");
    const emailInput = document.getElementById("email-input");

    const nameValue = nameInput.value;
    const dobValue = dobInput.value;
    const ageValue = ageInput.value;
    const emailValue = emailInput.value;

    var errors = "";

    const nameErrors = validateName(nameValue);
    if(nameErrors.length !== 0) {
        errors += nameErrors;
        nameInput.style.border = "2px solid red";
        nameImg.src = wrongImg;
    }
    else {
        nameInput.style.border = "2px solid green";
        nameImg.src = correctImg;
    }

    const dobErrors = validateDOB(dobValue);
    if(dobErrors.length !== 0) {
        errors += dobErrors;
        dobInput.style.border = "2px solid red";
        dobImg.src = wrongImg;
    }
    else {
        dobInput.style.border = "2px solid green";
        dobImg.src = correctImg;
    }

    const ageErrors = validateAge(ageValue, dobValue);
    if(ageErrors.length !== 0) {
        errors += ageErrors;
        ageInput.style.border = "2px solid red";
        ageImg.src = wrongImg;
    }
    else {
        ageInput.style.border = "2px solid green";
        ageImg.src = correctImg;
    }

    const emailErrors = validateEmail(emailValue);
    if(emailErrors.length !== 0) {
        errors += emailErrors;
        emailInput.style.border = "2px solid red";
        emailImg.src = wrongImg;
    }
    else {
        emailInput.style.border = "2px solid green";
        emailImg.src = correctImg;
    }

    if(errors.length === 0) {
        alert("Datele sunt completate corect!");
    }
    else {
        alert("Datele nu sunt completate corect!\nCampurile care nu au fost completate corect sunt:\n" + errors);
    }
}