import { supa } from "../scripts/supabase.js";

console.log("File Registrieren.js geladen");
const id = 12; //hier müsste schlussendlich die id des aktuell eingeloggten users abgerufen werden!!!
supa.from('profiles_duplicate')
.select('*')
.eq('id', id)
.then(response => {
    const result = response.body[0] //antwort kommt immer als array vom server - darum [0] für erste position des arrays
    console.log(response.body[0])
    document.getElementById("inputField_first_name").value = result.first_name; //id des inputfeldes muss jeweils noch im html ergänzt werden
    document.getElementById("inputField_last_name").value = result.last_name;
}).catch(error => {
    console.log("failed")
})



/*supa.from("profiles_duplicate").select([
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
});*/