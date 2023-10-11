import { supa } from "../scripts/supabase.js";

console.log("File Registrieren.js geladen");

var inputField_first_name = document.getElementById("inputField_first_name");
var inputField_last_name = document.getElementById("inputField_last_name");
var inputField_mail_adress = document.getElementById("inputField_mail_adress");
var inputField_birthday = document.getElementById("inputField_birthday");
var inputField_grundpramie = document.getElementById("inputField_grundpramie");
var inputField_ahv_number = document.getElementById("inputField_ahv_number");
var speichernButton = document.getElementById("speichernButton");

speichernButton.addEventListener("click", function() {
    var vorname = inputField_first_name.value;
    var nachname = inputField_last_name.value;
    var email = inputField_mail_adress.value;
    var geburtstag = inputField_birthday.value;
    var grundpramie = inputField_grundpramie.value;
    var ahvNummer = inputField_ahv_number.value;

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
    }).catch(error => {
        console.error('Fehler beim Speichern der Daten:', error);
    });

});
