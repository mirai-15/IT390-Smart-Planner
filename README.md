# IT390-Smart-Planner

This is the week 11 branch. We'll merge our changes from the weekly branches here.

1. The site is now hosted and the link is here: https://smartplanner-f2540.web.app. 

Trying to add messaging feature: 
Firebase requires a Web Push certificate (VAPID key).
1. Go to Firebase Console
2. Project Settings → Cloud Messaging
3. Scroll to the Web Configuration section
4. Press Generate Key Pair (unless one already exists)
5. Copy the Public VAPID key and paste into line 85 of index.html
