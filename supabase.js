console.log("Initialisierung Supabase");

// Supabase Initialisierung
const supabaseUrl = 'https://fmxlnwinljgdtnaohowu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZteGxud2lubGpnZHRuYW9ob3d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY4NTY1OTIsImV4cCI6MjAxMjQzMjU5Mn0.q1LGNdb4kJFaB4u6J1MyA0SxhtxzUZx_b7RnDGMdOvc'
const supa = supabase.createClient(supabaseUrl, supabaseKey, {
    auth: {
        redirectTo: window.location.origin,  // This will redirect back to the page where the request originated from
    },
});

export { supa }
//bis hier ist es rein der code um auf die supabasedatenbank zuzugreifen



// code von 1_magiclink.js 1zu1 kopiert - Belinda !!!

import { supa } from "../../00_setup/supabase.js"; // was muss hier verlinkt werden? (ich denke das index.html)

console.log(window.location.origin);

// Funktion, um Magic Link zu senden
async function sendMagicLink() {
    const email = document.getElementById('emailInput').value;
    const { error } = await supa.auth.signIn({ email });
    
    if (error) {

        console.error("Error sending magic link: ", error.message);
    } else {
        console.log("Magic link sent to ", email);
    }
}

// Funktion, um User Status zu aktualisieren
function updateUserStatus(user) {
  const userStatusElement = document.getElementById('userStatus');
  
  if (user) {
      userStatusElement.textContent = `Authenticated as: ${user.email}`;
  } else {
      userStatusElement.textContent = "Not authenticated.";
  }
}

// Prüfe und zeige den initialen User Status an
const initialUser = supa.auth.user();
updateUserStatus(initialUser);

// Eventlistener für Magic Link Button
document.getElementById('sendMagicLinkButton').addEventListener('click', sendMagicLink);

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
  }
}

document.getElementById('logoutButton').addEventListener('click', logout);