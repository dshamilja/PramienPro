import { supa } from "../scripts/supabase.js"

console.log("File berechner.js geladen");


//Eingabe der Inputfelder durch click auf Berechnen-Button in die Supabasetabelle speichern
const initialUser = supa.auth.user();

var datePicker = document.getElementById("date-picker");
var durationInput = document.querySelector(".feld-input");
var speichernButton = document.querySelector(".calculate-content");

speichernButton.addEventListener("click", (event) => {
    event.preventDefault();
    registerActivity();
});

async function registerActivity() {
    var datum = datePicker.value;
    var dauer = durationInput.value;
    var sportart = document.querySelector('input[type=radio]:checked').value;

    let sportartBool;

    console.log(sportart);

    // Validate input fields if necessary
    if (!datum || !dauer || !sportart) {
        console.log("Bitte füllen Sie alle Felder aus.");
        return;
    }

    let savedMoney;

    if(sportart == "2"){
        savedMoney = dauer * 0.01;
        sportartBool = false;
    } else {
        savedMoney = dauer * 0.008;
        sportartBool = true;
    }


    const { data, error } = await supa
        .from("activities")
        .insert(
            {
                user_id: initialUser.id,
                date: datum,
                duration: dauer,
                saved_money: savedMoney,
                sport_type: sportartBool
            }
        );

    if (error) {
        console.error("Fehler beim Speichern der Daten:", error);
    } else {
        localStorage.setItem("saved_money", savedMoney);
        console.log("Daten erfolgreich gespeichert:", data);
        datePicker.value = "";
        durationInput.value = "";
        document.querySelector('input[name="sport"]:checked').checked = false;
        window.location.href = "/pages/berechnung.html";
    }
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
        window.location.href = '../index.html';
    }
}
