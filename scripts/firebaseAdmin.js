import admin from "firebase-admin";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(
    fs.readFileSync("./scripts/tsungi-ai-firebase-adminsdk-fbsvc-e87a4937eb.json", "utf8")
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    });
}

export const bucket = admin.storage().bucket();
export const db = admin.firestore();