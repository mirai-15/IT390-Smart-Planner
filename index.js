const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendEventReminders = functions.pubsub.schedule("every 1 hours").onRun(async () => {
  const now = new Date();
  const oneDayLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const eventsSnapshot = await admin.firestore().collection("events").get();

  for (const doc of eventsSnapshot.docs) {
    const event = doc.data();
    const start = new Date(event.start);

    if (
      start.getFullYear() === oneDayLater.getFullYear() &&
      start.getMonth() === oneDayLater.getMonth() &&
      start.getDate() === oneDayLater.getDate()
    ) {
      const usersSnapshot = await admin.firestore().collection("users").get();

      usersSnapshot.forEach((userDoc) => {
        const user = userDoc.data();

        if (user.fcmToken) {
          admin.messaging().send({
            token: user.fcmToken,
            notification: {
              title: `Reminder: ${event.title}`,
              body: `Your event starts tomorrow at ${event.start}`
            }
          });
        }
      });
    }
  }

  return null;
});
