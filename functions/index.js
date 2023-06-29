/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const firestore = admin.firestore();
exports.onUserStatusChange = functions.database.ref("/{uid}/active").onUpdate(
    async (change, context) => {
      // get the data written to realtime database
      const isActive = change.after.val();
      // get reference to cloud firestore doc
      const firestoreRef = firestore.doc(`users/${context.params.uid}`);
      // update the value of firestore database
      return firestoreRef.update({
        active: isActive,
        lastSeen: Date.now(),
      });
    },
);

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
