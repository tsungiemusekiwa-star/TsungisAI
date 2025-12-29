import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(
    fs.readFileSync("./scripts/testtsungiai-firebase-adminsdk-fbsvc-c2df18bb1a.json", "utf8")
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    });
}

export const bucket = admin.storage().bucket();
export const db = admin.firestore();