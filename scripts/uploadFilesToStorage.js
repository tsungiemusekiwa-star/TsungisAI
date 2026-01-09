// Generic Firebase Storage File Uploader
// Supports uploading a single file or a folder of files
// Change LOCAL_PATH, STORAGE_DIR, and ALLOWED_EXTENSIONS as needed

import fs from "fs";
import path from "path";
import { bucket } from "./firebaseAdmin.js";

// Local file or folder to read from
const LOCAL_PATH = "./tmp/CA1 Sound Revision/Disk 5";
// For a folder, just put the folder path like "../tmp/my-folder"

// Firebase Storage folder
const STORAGE_DIR = "CA1 Sound Revision/Disk 5"; // <-- Change this to your desired storage folder

// Allowed file extensions
const ALLOWED_EXTENSIONS = [".xlsx", ".pdf", ".mp3"]; // <-- Change to any file types you want

// MIME type mapping
const MIME_TYPES = {
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".pdf": "application/pdf",
    ".txt": "text/plain",
    ".mp3": "audio/mpeg",
    ".png": "image/png",
    ".jpg": "image/jpeg",
};

function getFilesFromPath(localPath) {
    const stat = fs.statSync(localPath);

    if (stat.isDirectory()) {
        // Folder: get all allowed files
        return fs
            .readdirSync(localPath)
            .filter(f => ALLOWED_EXTENSIONS.includes(path.extname(f).toLowerCase()))
            .map(f => path.join(localPath, f));
    } else if (stat.isFile()) {
        // Single file: check extension
        if (ALLOWED_EXTENSIONS.includes(path.extname(localPath).toLowerCase())) {
            return [localPath];
        } else {
            console.warn(`⚠️ File skipped (extension not allowed): ${localPath}`);
            return [];
        }
    } else {
        return [];
    }
}

/* --------------------- MAIN --------------------- */

async function run() {
    if (!fs.existsSync(LOCAL_PATH)) {
        console.error("Path not found:", LOCAL_PATH);
        return;
    }

    const files = getFilesFromPath(LOCAL_PATH);

    if (files.length === 0) {
        console.log("No files to upload matching extensions:", ALLOWED_EXTENSIONS);
        return;
    }

    for (const file of files) {
        const fileName = path.basename(file);
        const ext = path.extname(file).toLowerCase();
        const remotePath = `${STORAGE_DIR}/${fileName}`;

        console.log(`Uploading ${fileName} ...`);

        await bucket.upload(file, {
            destination: remotePath,
            contentType: MIME_TYPES[ext] || "application/octet-stream", // fallback MIME type
        });

        console.log(`Uploaded ${remotePath}`);
    }

    console.log("Upload complete!");
}

/* --------------------- RUN --------------------- */

run().catch(console.error);