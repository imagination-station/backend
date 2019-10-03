import admin from 'firebase-admin';
import dotenv from 'dotenv'
dotenv.config();

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: "https://imaginationstation-3c7a7.firebaseio.com"
});

export default admin

