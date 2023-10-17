import { supa } from "/scripts/supabase.js"

// Funktion, um Magic Link zu senden

async function sendMagicLink() {
    const email = document.getElementById('emailInput').value;
    const { error } = await supa.auth.signIn({ email: email });
    
    if (error) {
        console.error("Error sending magic link: ", error.message);
    } else {
        console.log("Magic link sent to ", email);
        alert("Magic Link wurde versendet. Bitte prüfen Sie Ihre E-Mail und klicken Sie auf den Link, um sich einzuloggen.");
    }
}

// Funktion, um User Status zu aktualisieren
function updateUserStatus(user) {
    console.log(user)
  const userStatusElement = document.getElementById('userStatus');
  
  if (user) {
      userStatusElement.textContent = `Authenticated as: ${user.email}`;
      
      redirectToUrl(user);
  } else {
      userStatusElement.textContent = "Not authenticated.";
  }
}

// Prüfe und zeige den initialen User Status an
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Eventlistener für Magic Link Button
document.getElementById('sendMagicLinkButton').addEventListener('click', (event) => {
    event.preventDefault();
    sendMagicLink();
});






// Listener, für Änderungen des Auth Status
// UserStatus wird aktualisiert, wenn sich der Auth Status ändert
supa.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_IN") {
      console.log("User signed in: ", session.user);

      updateUserStatus(session.user);


  } else if (event === "SIGNED_OUT") {
      console.log("User signed out");
      updateUserStatus(null);
  }
});

// 3. Logout Logik
async function logout() {
  const { error } = await supa.auth.signOut();
  if (error) {
      console.error("Error during logout:", error);
  } else {
      updateUserStatus(null);
      console.log("User logged out successfully.");
      // Redirect to login page after successful logout
      window.location.href = 'index.html'; // Ändern Sie 'login.html' entsprechend Ihrer Login-Seite
  }
}

document.getElementById('logoutButton').addEventListener('click', logout);

async function redirectToUrl(user){

    const { data , error } = await supa
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

    if(error){
        console.log("HALT STOP: " + error);
    }

    console.log(data);

    if(data.length == 0 || data == null) {
        window.location.href = "../pages/benutzer.html";
        return;
    } else if(data.social_insurance_number == null || data.social_insurance_number == ""){
        window.location.href = "../pages/benutzer.html";
        return;
    } else {
        window.location.href = "../pages/jahresuebersicht.html";
        return;
    }

}
