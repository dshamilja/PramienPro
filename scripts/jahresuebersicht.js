import { supa } from "../scripts/supabase.js"
// Logout über Logoutbutton im Footer
document.getElementById('logoutButton').addEventListener('click', function() {
    logout();
});



const initialUser = supa.auth.user();

const monthContainer = document.querySelector('.container-month');

const thisYear = new Date().getFullYear();

let yearlySaved = 0.0;

fetchMonth();

async function fetchMonth(){

    for (let i = 1; i <= 12; i++){

        let totalSaved = 0.00;

        const startOfMonth = thisYear + "-" + pad(i) + "-01";
        let endOfMonth;

        if(i == 2) {

            endOfMonth = thisYear + "-" + pad(i) + "-28";

        } else if(i == 1 || i == 3 || i == 5 || i == 7 || i == 8 || i ==  10 || i == 12){

            endOfMonth = thisYear + "-" + pad(i) + "-31";

        } else {

            endOfMonth = thisYear + "-" + pad(i) + "-30";

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

        // console.log(data);

        data.forEach(async (activity) => {
            totalSaved += activity.saved_money;
        });

        if(totalSaved != 0){

            yearlySaved += totalSaved;

            const months = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

            const monthItem = document.createElement('div');
            monthItem.classList.add('month-item');

            let monthIndex = i-1;

            monthItem.innerHTML = months[monthIndex] + " "+ totalSaved.toFixed(2)+ " CHF gespart";

            console.log(months[monthIndex] + " " + pad(i) + " : " + totalSaved);

            monthItem.addEventListener('click', () => {
                window.location.href = "../pages/monatsuebersicht.html?month=" + pad(i);
            });


            monthContainer.appendChild(monthItem);

        }



    }

    getNewPremium();

}


async function getNewPremium(){

    const totalSavings = document.getElementById('total-savings');

    const {data,error} = await supa
    .from('profiles')
    .select('*')
    .eq('id', initialUser.id)
    .single();

    if(error){
        console.log(error.message);
    }

    console.log(data);

    let result = parseFloat(yearlySaved).toFixed(2);

    totalSavings.innerHTML = `Du sparst dieses Jahr ${result} CHF KK-Prämie.`

}

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

function pad(d) {
    return (d < 10) ? '0' + d.toString() : d.toString();
}