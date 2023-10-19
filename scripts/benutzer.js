import { supa } from "../scripts/supabase.js";

const initialUser = supa.auth.user();

supa.from('profiles')
 .select('*')
 .eq('id', initialUser.id)
 .then(response => {
     const result = response.body[0] //antwort kommt immer als array vom server - darum [0] für erste position des arrays
     console.log(response.body[0])
     document.getElementById("inputField_first_name").value = result.first_name; //id des inputfeldes muss jeweils noch im html ergänzt werden
     document.getElementById("inputField_last_name").value = result.last_name;
     document.getElementById("inputField_mail_address").value = result.mail_address;
     document.getElementById("inputField_birth_date").value = result.birth_date;
     document.getElementById("inputField_base_premium").value = result.base_premium;
     document.getElementById("inputField_social_insurance_number").value = result.social_insurance_number;
 }).catch(error => {
     console.log("failed")
 })

//document.getElementById('inputField_mail_address').value = initialUser.email;
//document.getElementById("inputField_first_name").value = initialUser.first_name;

const saveButton = document.getElementById('save-btn');

saveButton.addEventListener('click', function () {
    updateUser(initialUser)
});

console.log("File Registrieren.js geladen");
 //hier müsste schlussendlich die id des aktuell eingeloggten users abgerufen werden!!!
 

 


async function updateUser(user) {
    const first_name = document.getElementById("inputField_first_name").value;
    const last_name = document.getElementById("inputField_last_name").value;
    const mail = document.getElementById("inputField_mail_address").value;
    const birthdate = document.getElementById("inputField_birth_date").value;
    const basepremium = document.getElementById("inputField_base_premium").value;
    const ahv = document.getElementById("inputField_social_insurance_number").value;

    if(first_name == "" || last_name == "" || birthdate =="" || basepremium == "" || ahv == ""){
        alert('BITTE ALLE FELDER AUSFÜLLEN!');
        return;
    }


    const {data,error} = await supa
    .from('profiles')
    .update({
        first_name: first_name,
        last_name: last_name,
        birth_date: birthdate,
        base_premium: basepremium,
        social_insurance_number: ahv
    })
    .eq('id', user.id);

    if(error){
        console.log("Fehler " + error);
    }

    if(data){
        window.location.href = "./jahresuebersicht.html";
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
        window.location.href = '../index.html'; // Ändern Sie 'login.html' entsprechend Ihrer Login-Seite
    }
}