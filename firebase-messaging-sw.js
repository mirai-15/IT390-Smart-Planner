importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.3.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBNwZRftT8Cn8DufLbmddKHvK0lMhRRxlU",
  authDomain: "smartplanner-f2540.firebaseapp.com",
  projectId: "smartplanner-f2540",
  messagingSenderId: "469173527661",
  appId: "1:469173527661:web:b27cff5519aedd4a338b64"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message: ", payload);

  const notificationTitle = payload.notification?.title || "SmartPlanner";
  const notificationOptions = {
    body: payload.notification?.body
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});
