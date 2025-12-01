function startLoading (){
    let loading_page = document.getElementById("loading_page");
    let progress_bar = document.getElementById("bar");
    let app = document.getElementById("app");

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

import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } 
  from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNwZRftT8Cn8DufLbmddKHvK0lMhRRxlU",
  authDomain: "smartplanner-f2540.firebaseapp.com",
  projectId: "smartplanner-f2540",
  storageBucket: "smartplanner-f2540.firebasestorage.app",
  messagingSenderId: "469173527661",
  appId: "1:469173527661:web:b27cff5519aedd4a338b64",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

let eventsRef = null;
let calendar;
let selectedDate;

// Load event if a user logged in
async function loadEventsFromFirestore() {
  if (!eventsRef) return;
  const querySnapshot = await getDocs(eventsRef);
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    calendar.addEvent({
      id: docSnap.id,
      title: data.title,
      start: data.start,
      end: data.end,
      allDay: false,
    });
  });
}

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
        document.getElementById("addStartDate").value = selectedDate;
        document.getElementById("addStartTime").value   = "";

        document.getElementById("addEndDate").value = "";
        document.getElementById("addEndTime").value   = "";

        document.getElementById("addTitle").value = "";

        let modal = document.getElementById("addModal");

        let x = info.jsEvent.pageX;
        let y = info.jsEvent.pageY;

        modal.style.display = "block";
        modal.style.position = "absolute";
        modal.style.left = x+"px";
        modal.style.top = (y-50) + "px";
    },
    eventClick: async function (info) {
      if (confirm("Do you want to delete '" + info.event.title + "'?")) {
        if (eventsRef && info.event.id) {
          await deleteDoc(doc(eventsRef, info.event.id));
        }
        info.event.remove();
      }
    },
  });
    calendar.render();

    if (eventsRef) loadEventsFromFirestore();
}

// Execute when an user try to add a task. 
async function saveEvent() {
    let title = document.getElementById("addTitle").value;
    let startDate = document.getElementById("addStartDate").value;
    let startTime = document.getElementById("addStartTime").value;
    let endDate = document.getElementById("addEndDate").value;
    let endTime = document.getElementById("addEndTime").value;
    
    if (!title || !startDate || !startTime || !endDate || !endTime) {
        alert("Please complete all fields.");
        return;
    }
    
    let start = startDate + "T" + startTime;
    let end   = endDate + "T" + endTime;
    
    let docRef = null;
    
    if (eventsRef) {
    docRef = await addDoc(eventsRef, { title, start, end });
}
    
    calendar.addEvent({
        title: title,
        start: start,
        end: end,
        allDay: false
    });
    closeAddModal();
}

function closeAddModal() {
    document.getElementById("addModal").style.display = "none";
}

if (document.title == "Try Smart Planner"){
    window.onload = startLoading;
}

export { saveEvent, closeAddModal };

export function setEventsRef(ref) {
  eventsRef = ref;
}
export { loadEventsFromFirestore, db };