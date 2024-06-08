const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./credentials.json');

// Initialize the Firebase app with the service account credentials
initializeApp({
  credential: cert(serviceAccount),
});

// Get Firestore instance
const db = getFirestore();

// Set Firestore settings to ignore undefined properties
db.settings({
  ignoreUndefinedProperties: true
});

module.exports = { db };
