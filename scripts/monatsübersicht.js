import { supa } from "../scripts/supabase.js"

const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const month = urlParams.get('month');
const monthIndex = parseInt(month) -1;

const title = document.querySelector('.title-overview');

title.innerHTML += ' ' + months[monthIndex];


const initialUser = supa.auth.user();

const monthContainer = document.querySelector('.container-month');

const thisYear = new Date().getFullYear();


fetchMonthData();



async function fetchMonthData(){

        monthContainer.innerHTML = null;

        let totalSaved = 0.00;

        let i = monthIndex + 1;

        const startOfMonth = thisYear + "-" + month + "-01";
        let endOfMonth;

        if(i == 2) {

            endOfMonth = thisYear + "-" + month + "-28";

        } else if(i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i ==  10 || i == 12){

            endOfMonth = thisYear + "-" + month + "-31";

        } else {

            endOfMonth = thisYear + "-" + month + "-30";

        }

        const { data, error} = await supa
        .from('activities')
        .select('*')
        .eq('user_id', initialUser.id)
        .gte('date', startOfMonth)
        .lte('date', endOfMonth);

        if(error){
            console.log("Error: " + error.message);
            return;
        }

        console.log(data);


        for (const activity of data) {

            // let index = (data.indexOf(activity))-1;

            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

            const activityDate = new Date(activity.date).toLocaleDateString('de-DE', options);
            let activityType;

            if(activity.sport_type == false) {
                activityType = "Kraftsport";
            } else {
                activityType = "Ausdauersport";
            }

            const duration = activity.duration;

            const moneySaved = activity.saved_money.toFixed(2);

            monthContainer.innerHTML += `
            <div class="month-item">${activityDate}, ${activityType}, ${duration} min, CHF ${moneySaved}
            <div class="month-button" data-activity-id="${activity.id}"></div>
            </div>
                
        `;


        }

        const deleteButtons = document.querySelectorAll('.month-button');
        deleteButtons.forEach(button =>{
            button.addEventListener('click', async () =>{
                deleteActivity(button.dataset.activityId);
            });
        });

    }


    async function deleteActivity(activity_id) {

        const { error } = await supa
            .from('activities')
            .delete()
            .eq('id', activity_id);

        if(error){
            console.log("Error: " + error.message);
            return;
        }

        fetchMonthData();

    }





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
