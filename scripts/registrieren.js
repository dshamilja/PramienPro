import { supa } from "../scripts/supabase.js";

console.log("File Registrieren.js geladen");

var inputField_first_name = document.getElementById("inputField_first_name");
var inputField_last_name = document.getElementById("inputField_last_name");
var inputField_mail_adress = document.getElementById("inputField_mail_adress");
var inputField_birth_date = document.getElementById("inputField_birth_date");
var inputField_base_premium = document.getElementById("inputField_base_premium");
var inputField_social_insurance_number = document.getElementById("inputField_social_insurance_number");
var speichernButton = document.getElementById("speichernButton");

speichernButton.addEventListener("click", function() {
    var vorname = inputField_first_name.value;
    var nachname = inputField_last_name.value;
    var email = inputField_mail_adress.value;
    var geburtstag = inputField_birth_date.value;
    var grundpramie = inputField_base_premium.value;
    var ahvNummer = inputField_social_insurance_number.value;

    // Validate input fields if necessary
    if (!vorname || !nachname || !email || !geburtstag || !grundpramie || !ahvNummer) {
        console.log('Bitte füllen Sie alle Felder aus.');
        return;
    }

    supa.from("profiles_duplicate").insert([
        {
            first_name: vorname,
            last_name: nachname,
            mail_address: email,
            birth_date: geburtstag,
            base_premium: grundpramie,
            social_insurance_number: ahvNummer
        }
    ]).then(response => {
        console.log('Daten erfolgreich gespeichert:', response);
        window.location.href = "/pages/jahresuebersicht.html";
    }).catch(error => {
        console.error('Fehler beim Speichern der Daten:', error);
    });

});
