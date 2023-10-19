import { supa } from "/scripts/supabase.js"
// Logout über Logoutbutton im Footer
document.getElementById('logoutButton').addEventListener('click', function() {
    logout();
});

const moneyMessage = document.getElementById('message');
const savedMoney = localStorage.getItem("saved_money");

moneyMessage.innerHTML = "Du hast CHF " + savedMoney + " gespart!";

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
