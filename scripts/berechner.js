// Logout über Logoutbutton im Footer
document.getElementById('logoutButton').addEventListener('click', function() {
    logout();
    console.log("User logged out successfully.");
    // Redirect to login page after erfolgreicher Abmeldung
    window.location.href = '../index.html'; // Ändern Sie 'login.html' entsprechend Ihrer Login-Seite
});

function logout() {
    // Hier kannst du den Code für die Abmeldung implementieren, falls erforderlich
    // Zum Beispiel: Code zum Löschen von Session-Daten, Authentifizierungstoken usw.
}
