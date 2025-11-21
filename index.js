const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendEventReminders = functions.pubsub.schedule("every 1 hours").onRun(async () => {
  const now = new Date();
  const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const usersSnapshot = await admin.firestore().collection("users").get();

  for (const doc of usersSnapshot.docs) {
    const user = userDoc.data();
    const uid = userDoc.id;

    if(!user.fcmToken) continue;

    const eventsRef = admin.firestore().collection("users").doc(uid).collection("events");

    const eventsSnapshot = await eventsRef.get();

    for (const eventDoc of eventsSnapshot.docs){
      const event = eventDoc.data();
      const start = new Date(event.start);

      const isTomorrow = 
        start.getFullYear() === oneDayLater.getFullYear() && start.getMonth() === oneDayLater.gentMonth() && start.getDate() === oneDayLater.getDate();

      if (isTomorrow){
        await admin.messaging().send({
            token: user.fcmToken,
            notification: {
              title: `Reminder: ${event.title}`,
              body: `Your event starts tomorrow at ${event.start}`
            }
      });
      }
    }
  }
  return null;
});

exports.sendTaskReminderEmail = functions.firestore
  .document('users/{userId}/events/{eventId}')
  .onCreate(async (snap, context) => {
    const event = snap.data();
    const userId = context.params.userId;

    // Get user email
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const userEmail = userDoc.data()?.email;
    if (!userEmail) return;

    // Create a document in the mail collection
    await admin.firestore().collection('mail').add({
      to: userEmail,
      message: {
        subject: `Reminder: ${event.title}`,
        text: `You have a task "${event.title}" scheduled at ${event.start}.`,
        html: `<p>You have a task "<strong>${event.title}</strong>" scheduled at ${event.start}.</p>`
      }
    });
  });
