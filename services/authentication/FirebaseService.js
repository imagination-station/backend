import admin from 'firebase-admin';
import dotenv from 'dotenv'
dotenv.config();

admin.initializeApp({
    credential: admin.credential.cert({
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: "https://imaginationstation-3c7a7.firebaseio.com"
});

export default admin