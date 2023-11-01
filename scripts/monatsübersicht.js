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

async function getNewPremium(yearlySaved){
    const totalSavings = document.getElementById('total-savings-month');
    const {data, error} = await supa
    .from('profiles')
    .select('*')
    .eq('id', initialUser.id)
    .single();

    if(error){
        console.log(error.message);
    }

    let result = parseFloat(data.base_premium - yearlySaved).toFixed(2);
    console.log(result)
    totalSavings.innerHTML = `Du zahlst diesen Monat ${result} CHF KK-Prämie.`
}


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

        // Funktion um Sparbetrag anzuzeigen
        let totalMoney = 0;
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
            totalMoney += activity.saved_money;

            monthContainer.innerHTML += `
            <div class="month-item">${activityDate}, ${activityType}, ${duration} min, CHF ${moneySaved}
            <div class="month-button" data-activity-id="${activity.id}"></div>
            </div>
                
        `;}
        getNewPremium(totalMoney)
        

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
