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

let calendar;
function startCalendar (){
    //Full calendar api background.
    let calendarEl = document.getElementById('calendar');
    calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',

    // Set calendar header.
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },

    // Users can select calendar slot.
    selectable: true,

    // Users can use drag/drop and resizing features.
    editable: true,

    // Add a task
    dateClick: function(info) {
        selectedDate = info.dateStr;
        document.getElementById("addStart").value = selectedDate + "T09:00";
        document.getElementById("addEnd").value   = selectedDate + "T10:00";
        document.getElementById("addTitle").value = "";

        let modal = document.getElementById("addModal");

        let x = info.jsEvent.pageX;
        let y = info.jsEvent.pageY;

        modal.style.display = "block";
        modal.style.position = "absolute";
        modal.style.left = x+"px";
        modal.style.top = (y-50) + "px";
    }});
    calendar.render();
}

// Execute when an user try to add a task. 
function saveEvent() {
    let title = document.getElementById("addTitle").value;
    let start = document.getElementById("addStart").value;
    let end   = document.getElementById("addEnd").value;
    
    if (title && start && end) {
        calendar.addEvent({
            title: title,
            start: start,
            end: end,
            allDay: false
        });
    }
    closeAddModal();
}

function closeAddModal() {
    document.getElementById("addModal").style.display = "none";
}

if (document.title == "Try Smart Planner"){
    window.onload = startLoading;
}
