import { supa } from "../scripts/supabase.js";

console.log("File Registrieren.js geladen");

const initialUser = supa.auth.user();

var inputField_first_name = document.getElementById("inputField_first_name");
var inputField_last_name = document.getElementById("inputField_last_name");
var inputField_mail_adress = document.getElementById("inputField_mail_adress");
var inputField_birth_date = document.getElementById("inputField_birth_date");
var inputField_base_premium = document.getElementById("inputField_base_premium");
var inputField_social_insurance_number = document.getElementById("inputField_social_insurance_number");
var speichernButton = document.getElementById("speichernButton");

inputField_mail_adress.value = initialUser.email;

speichernButton.addEventListener("click", (event) => {
    event.preventDefault();
    registerUserData();
});

async function registerUserData() {
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

    const { error } = await supa
    .from("profiles")
    .update([
        {
            first_name: vorname,
            last_name: nachname,
            mail_address: email,
            birth_date: geburtstag,
            base_premium: grundpramie,
            social_insurance_number: ahvNummer
        }
    ])
    .eq('id', initialUser.id);

    if(error){
        console.log("error: " + error.message + "\n hint: " + error.hint);
        return;
    }

    console.log('Daten erfolgreich gespeichert:');
    window.location.href = "/pages/jahresuebersicht.html";
}

// Logout über Logoutbutton im Footer
document.getElementById('logoutButton').addEventListener('click', function() {
    logout();
});

async function logout() {
    const { error } = await supa.auth.signOut();
    if (error) {
        console.error("Error during logout:", error);
    } else {
        console.log("User logged out successfully.");
        // Redirect to login page after successful logout
        window.location.href = '../index.html'; // Ändern Sie 'login.html' entsprechend Ihrer Login-Seite
    }
}
