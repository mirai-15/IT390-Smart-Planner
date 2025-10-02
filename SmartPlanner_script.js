function displayPricing() {
    alert("Basic Plan: Free\nPremium Plan: $15.99/month\nMore details on the pricing page.");
}

function startLoading (){
    let loading_page = document.getElementById("loading_page");
    let progress_bar = document.getElementById("bar");

    let value = 0;
    let loading = setInterval(()=>{
        value += 5;
        progress_bar.style.width = value + "%";
        if (value >= 100){
            clearInterval(loading);
            loading_page.style.display = "none";
            app.style.display = "block"; 
            startCalendar();
        }
    }, 150);
}

function startCalendar (){
    //Full calendar api background.
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',

    // Set calendar header.
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },

    // Users can select calendar slot.
    selectable: true,

    // Users can use drag&drop and resizing features.
    editable: true
    });
    calendar.render();

}

if (document.title == "Try Smart Planner"){
    window.onload = startLoading;
}
